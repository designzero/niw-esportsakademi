//Global variables
let canvas;
let context;
let map = "/img/de_dust2_radar.png";
let mapImage = new Image();
let title = "dust2";
let mapDrawerOut = false;
let degrees = 0;
let zoomLevel = 1;

let cPushArray = new Array();
let cStep = -1;
let pen = false;
let currentPen = 0;
const pens = [{
	color: "red",
	cursor: "red"
},	
{
	color: "lightblue",
	cursor: "blue"
},	
{
	color: "#de9b35",
	cursor: "orange"
}];

//-------------------------------------
//Functions
//-------------------------------------

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(canvas.toDataURL());
    // document.title = cStep + ":" + cPushArray.length;
}
function cUndo() {
	cStep--;
	if (cStep < 0) {cStep = 0;}
	console.log(cStep);
    if (cStep > 0) {
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
        	clearCanvas();
        	context.drawImage(canvasPic, 0, 0); 
        }
        // document.title = cStep + ":" + cPushArray.length;
    }
    else {
    	changeMap(map, title);
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
        	clearCanvas();
        	context.drawImage(canvasPic, 0, 0); 
        }
        // document.title = cStep + ":" + cPushArray.length;
    }
}

function drawLine(x1, y1, x2, y2, color, erasing) {
	setColor(color);
	setErasing(erasing);
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.closePath();
	context.stroke();
}

function setColor(color) {
	context.strokeStyle = color;
}



function toggleColor() {
	if(pen) {
		currentPen++;
	}
	if (currentPen > 2) {
		currentPen = 0;
	}
	document.getElementById("pen").style.borderBottom = "3px solid " + pens[currentPen].color;
	canvas.style.cursor = "url(/img/" + pens[currentPen].cursor + ".cur), auto";
	return lineColor = pens[currentPen].color;
}

function setErasing(erasing) {
	if(erasing == true){
		context.globalCompositeOperation="destination-out";
		context.lineWidth = 8;
		
    }else {
		context.globalCompositeOperation="source-over";
		context.lineWidth = 3;
		
	}
}

function toggleMaps() {
	if(mapDrawerOut) {
		$("#mapMenu").animate({
			right: 100
		}, 100, function(){
			mapDrawerOut = false;
			Object.assign(document.getElementById("mapsArrow").style,{msTransform: "rotate(0deg)", webkitTransform: "rotate(0deg)", transform: "rotate(0deg)"});
		});
	} else {
		$("#mapMenu").animate({
			right: 0
		}, 100, function(){
			mapDrawerOut = true;
			Object.assign(document.getElementById("mapsArrow").style,{msTransform: "rotate(180deg)", webkitTransform: "rotate(180deg)", transform: "rotate(180deg)"});
		});
	}
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeMap(map, title) {
	context.restore();
	mapImage.onload = function() {
		clearCanvas();
		context.restore();
		context.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
	};
	mapImage.src = map;
	
	changeTitle(title);
	
	degrees = 0;
}

function changeTitle(mapname) {
	document.querySelector("h1").textContent = "de_" + mapname;
}

function rotateMap(map, backwards) {
	clearCanvas();
	
	let mapImage = new Image();
	mapImage.onload = function() {
		context.save();

	    // move to the center of the canvas
	    context.translate(canvas.width/2,canvas.height/2);

	    // rotate the canvas to the specified degrees
	    
	    if (backwards){
		degrees -= 90;
		}
		else {
			degrees += 90;
		}
	    context.rotate(degrees*Math.PI/180);

	    // draw the image
	    // since the context is rotated, the image will be rotated also
    	// context.drawImage(mapImage,0,0, canvas.width, canvas.height);
    	context.drawImage(mapImage,-canvas.width/2,-canvas.width/2, canvas.width, canvas.height);
    };
    mapImage.src = map;
    // we’re done with the rotating so restore the unrotated context
    context.restore();
}

function rotateCanvas() {

	// Create a temp canvas to store our data (because we need to clear the other box after rotation.
	let tempCanvas = document.createElement("canvas"),
	tempCtx = tempCanvas.getContext("2d");

	tempCanvas.width = canvas.width;
	tempCanvas.height = canvas.height;
	// put our data onto the temp canvas
	tempCtx.drawImage(canvas,0,0,canvas.width,canvas.height);

	// Append for debugging purposes, just to show what the canvas did look like before the transforms.
	// document.body.appendChild(tempCanvas);

	clearCanvas();

	context.save();

    // move to the center of the canvas
    context.translate(canvas.width/2,canvas.height/2);

    // rotate the canvas to the specified degrees
    context.rotate(90*Math.PI/180);
	context.drawImage(tempCanvas,-canvas.width/2,-canvas.width/2, canvas.width, canvas.height);
	context.restore();
}

var scaleFactor = 1.1;
var lastX, lastY;


var zoom = function(clicks){
	var pt = context.transformedPoint(lastX,lastY);
	context.translatez(pt.x,pt.y);
	var factor = Math.pow(scaleFactor,clicks);
	context.scale(factor,factor);
	context.translatez(-pt.x,-pt.y);
	redraw();

}


var handleScroll = function(evt){
	var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
	if (delta > 0 && zoomLevel < 6) {
		zoom(delta);
		zoomLevel += 1;
	}
	if (delta < 0 && zoomLevel > 1) {
		zoom(delta);
		zoomLevel -= 1;
	}
	console.log(zoomLevel);
	return evt.preventDefault() && false;
};

function redraw(){

	//Clear the entire canvas
	var p1 = context.transformedPoint(0,0);
	var p2 = context.transformedPoint(canvas.width,canvas.height);
	context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

	context.savez();
	context.setTransform(1,0,0,1,0,0);
	// context.clearRect(0,0,canvas.width,canvas.height);
	context.restorez();

	context.drawImage(mapImage,0,0,700,700);
	mapImage.src = map;
	// changeMap(canvas, context, map);

}


function trackTransforms(ctx){
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };

	var savedTransforms = [];
	var save = ctx.save;
	ctx.savez = function(){
	  savedTransforms.push(xform.translate(0,0));
	  return save.call(ctx);
	};

	var restore = ctx.restore;
	ctx.restorez = function(){
	xform = savedTransforms.pop();
	return restore.call(ctx);
	      };

	var scale = ctx.scale;
	ctx.scalez = function(sx,sy){
	xform = xform.scaleNonUniform(sx,sy);
	return scale.call(ctx,sx,sy);
	      };

	var rotate = ctx.rotate;
	ctx.rotatez = function(radians){
	  xform = xform.rotate(radians*180/Math.PI);
	  return rotate.call(ctx,radians);
	};

	var translate = ctx.translate;
	ctx.translatez = function(dx,dy){
	  xform = xform.translate(dx,dy);
	  return translate.call(ctx,dx,dy);
	};

	var transform = ctx.transform;
	ctx.transformz = function(a,b,c,d,e,f){
	  var m2 = svg.createSVGMatrix();
	  m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
	  xform = xform.multiply(m2);
	  return transform.call(ctx,a,b,c,d,e,f);
	};

	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
	  xform.a = a;
	  xform.b = b;
	  xform.c = c;
	  xform.d = d;
	  xform.e = e;
	  xform.f = f;
	  return setTransform.call(ctx,a,b,c,d,e,f);
	};

	var pt = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
	  pt.x=x; pt.y=y;
	  return pt.matrixTransform(xform.inverse());
	}
}




document.addEventListener("DOMContentLoaded", function() {
	canvas = document.getElementById('drawCanvas');
	context = canvas.getContext('2d');
	// let mapCanvas = document.getElementById('mapCanvas');
	// let mapContext = mapCanvas.getContext('2d');
	let mapMenu = document.getElementById('mapMenu');
	let menu = document.getElementById('menu');
	let student = document.getElementById('student');
	
	let drawing = false;
	let erasing = false;
	let x, y, prevX, prevY;
	let lineColor = "#FF0000";
	setColor(context, lineColor);
	context.lineWidth = 3;
	context.lineCap="round";

	let socket = io.connect();
	// socket.emit("cpush");

	lastX=canvas.width/2, lastY=canvas.height/2;

	canvas.addEventListener('DOMMouseScroll',handleScroll,false);
    canvas.addEventListener('mousewheel',handleScroll,false);

    trackTransforms(context);
    cPush();
    changeMap(map, title);
	
    // redraw();


	menu.onclick = function(e) {
		if(e.target.id == "pen") {
			erasing = false;
			// lineColor = "red";
			// canvas.style.cursor = "url(/img/red.cur), auto";
			lineColor = toggleColor();
			pen = true;
			e.target.parentNode.style.backgroundColor = "#466083";
			document.getElementById('eraser').parentNode.style.backgroundColor = "#7A8994";
		}
		
		if(e.target.id == "eraser") {
			erasing = true;
			pen = false;
			canvas.style.cursor = "url(/img/eraser.cur), auto";
			e.target.parentNode.style.backgroundColor = "#466083";
			document.getElementById('pen').parentNode.style.backgroundColor = "#7A8994";
		}

		if(e.target.className == "clear") {
			if (erasing) {
				setErasing(false);
			}
			changeMap(map, title);
			cPush();
			socket.emit('clear');
		}

		if(e.target.className == "rotateCW") {
			if (erasing) {
				setErasing(false);
			}
			// rotateMap(mapCanvas, mapContext, map);
			rotateCanvas();
			socket.emit('rotate', {
				'map': map
			});
		}

		// if(e.target.className == "rotateCCW") {
		// 	rotateMap(mapCanvas, mapContext, map, true);
		// 	rotateCanvas(canvas, context, true);

		// }

		if(e.target.className == "undo") {
			if (erasing) {
				setErasing(false);
			}
			cUndo();
			socket.emit("undo", {
				'erasing': erasing
			});
		}	

		if(e.target.className == "redo") {
			cRedo();
			socket.emit("redo");
		}

		setColor(lineColor);
		socket.emit('cngColor', {
			'color': lineColor
		});
	};

	mapMenu.onclick = function(e) {
		if(e.target.className == "mapIcon") {
			map = e.target.src;
			title = e.target.id;
			toggleMaps();
			clearCanvas();
			changeMap(map, title);
			socket.emit('clear');
			socket.emit('cngMap', {
				'map': map,
				'title': title
			});
		}
		if(e.target.id == "mapsDrawer" || "mapsArrow") {
			toggleMaps();
		}
	};


	canvas.onmousedown = function(e) {
		if(e.which == 1 && !student) {
			drawing = true;
			prevX = x;
			prevY = y;
		}
		if(e.which == 3) {
			e.preventDefault();
			return false;
		}
	}

	canvas.onmouseup = function(e) {
		drawing = false;
		cPush();
		socket.emit("cpush");
	}

	canvas.onmouseleave = function(e) {
		drawing = false;
	}

	canvas.onmousemove = function(e) {
		let rect = canvas.getBoundingClientRect();

		lastX = e.offsetX || (e.pageX - canvas.offsetLeft);
        lastY = e.offsetY || (e.pageY - canvas.offsetTop);

		x = e.clientX - rect.left;
		y = e.clientY - rect.top;
		if (drawing) {
			socket.emit('draw', {
				'x1': prevX,
				'y1': prevY,
				'x2': x,
				'y2': y,
				'color': lineColor,
				'erasing': erasing
			});
			drawLine(prevX, prevY, x, y, lineColor, erasing);
			prevX = x;
			prevY = y;
		}
	}
	
	socket.on('draw', function(data) {
		drawLine(data.x1, data.y1, data.x2, data.y2, data.color, data.erasing);
	});
	socket.on('cngColor', function(data) {
		setColor(data.color);
	});
	socket.on('cngMap', function(data) {
		changeMap(mapContext, data.map, data.title);
	});
	socket.on('clear', function(data) {
		clearCanvas();
	});
	socket.on('rotate', function(data) {
		setErasing(false);
		// rotateMap(data.map);
		rotateCanvas(false);
	});
	socket.on('undo', function(data) {
		if (data.erasing) {
			setErasing(false);
		}
		cUndo();
	});
	socket.on('redo', function(data) {
		cRedo();
	});
	socket.on('cpush', function(data) {
		cPush();
	});
});