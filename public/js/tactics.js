//-------------------------------------
//Global variables
//-------------------------------------

let map = "/img/de_dust2_radar.png";
let title = "dust2";
let mapDrawerOut = false;
let degrees = 0;

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

function cPush(canvas) {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(canvas.toDataURL());
    // document.title = cStep + ":" + cPushArray.length;
}
function cUndo(canvas, context) {
    if (cStep > 0) {
        cStep--;
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
        	clearCanvas(canvas, context);
        	context.drawImage(canvasPic, 0, 0); 
        }
        // document.title = cStep + ":" + cPushArray.length;
    }
}
function cRedo(canvas, context) {
    if (cStep < cPushArray.length-1) {
        cStep++;
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
        	clearCanvas(canvas, context);
        	context.drawImage(canvasPic, 0, 0); 
        }
        // document.title = cStep + ":" + cPushArray.length;
    }
}

function drawLine(context, x1, y1, x2, y2, color, erasing) {
	setColor(context, color);
	setErasing(context, erasing);
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.closePath();
	context.stroke();
}

function setColor(context, color) {
	context.strokeStyle = color;
}



function toggleColor(canvas) {
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

function setErasing(context, erasing) {
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
			right: 90
		}, 100, function(){
			mapDrawerOut = false;
			Object.assign(document.getElementById("mapsArrow").style,{msTransform: "rotate(0deg)", webkitTransform: "rotate(0deg)", transform: "rotate(0deg)"});
		});
	} else {
		$("#mapMenu").animate({
			right: -10
		}, 100, function(){
			mapDrawerOut = true;
			Object.assign(document.getElementById("mapsArrow").style,{msTransform: "rotate(180deg)", webkitTransform: "rotate(180deg)", transform: "rotate(180deg)"});
		});
	}
}

function clearCanvas(canvas, context) {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeMap(canvas, context, map, title) {
	
	let mapImage = new Image();
	mapImage.onload = function() {
		clearCanvas(canvas, context);
		context.restore();
		context.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
	};
	mapImage.src = map;
	
	if (title)
		changeTitle(title);
	degrees = 0;
}

function rotateMap(canvas, context, map, backwards) {
	clearCanvas(canvas, context);
	
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

function rotateDrawing(canvas, context) {

	// Create a temp canvas to store our data (because we need to clear the other box after rotation.
	let tempCanvas = document.createElement("canvas"),
	tempCtx = tempCanvas.getContext("2d");

	tempCanvas.width = canvas.width;
	tempCanvas.height = canvas.height;
	// put our data onto the temp canvas
	tempCtx.drawImage(canvas,0,0,canvas.width,canvas.height);

	// Append for debugging purposes, just to show what the canvas did look like before the transforms.
	// document.body.appendChild(tempCanvas);

	clearCanvas(canvas, context);

	context.save();

    // move to the center of the canvas
    context.translate(canvas.width/2,canvas.height/2);

    // rotate the canvas to the specified degrees
    context.rotate(90*Math.PI/180);
	context.drawImage(tempCanvas,-canvas.width/2,-canvas.width/2, canvas.width, canvas.height);
	context.restore();
}

function changeTitle(mapname) {
	document.getElementsByClassName("mapTitle")[0].textContent = "de_" + mapname;
}

var radius = 10;

// function pingAnim(context, x, y) {
// 	context.strokeStyle = "rgba(255, 255, 255, 0.5)";
// 	context.lineWidth = 2;
// 	context.beginPath();
// 	context.arc(x,y,radius,0,2*Math.PI);
// 	context.stroke();
// 	context.closePath();
	
// 	if (radius < 25) {
// 		radius += 2;
// 		requestAnimationFrame(pingAnim(context));
// 	}
// 	if (radius > 25) {
// 		radius = 5;
// 		context.clearRect(0, 0, 700, 700);	
// 	}
// }

//-------------------------------------
//DOM eventlistener
//-------------------------------------

document.addEventListener("DOMContentLoaded", function() {
	let canvas = document.getElementById('drawCanvas');
	let context = canvas.getContext('2d');
	let mapCanvas = document.getElementById('mapCanvas');
	let mapContext = mapCanvas.getContext('2d');
	let mapMenu = document.getElementById('mapMenu');
	let menu = document.getElementById('toolMenu');
	let student = document.getElementById('student');
	
	let drawing = false;
	let erasing = false;
	let x, y, prevX, prevY;
	let lineColor = "#FF0000";
	setColor(context, lineColor);
	context.lineWidth = 3;
	context.lineCap="round";

	changeMap(mapCanvas, mapContext, map, title);
	cPush(canvas);
	

	let socket = io.connect();
	socket.emit("cpush");

	menu.onclick = function(e) {
		console.log(e.target);
		if(e.target.id == "pen") {
			erasing = false;
			lineColor = toggleColor(canvas);
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
			clearCanvas(canvas, context);
			cPush(canvas);
			socket.emit('clear');
		}

		if(e.target.className == "rotateCW") {
			if (erasing) {
				setErasing(context, false);
			}
			rotateMap(mapCanvas, mapContext, map);
			rotateDrawing(canvas, context, false);
			socket.emit('rotate', {
				'map': map
			});
		}

		// if(e.target.className == "rotateCCW") {
		// 	rotateMap(mapCanvas, mapContext, map, true);
		// 	rotateDrawing(canvas, context, true);

		// }

		if(e.target.className == "undo") {
			if (erasing) {
				setErasing(context, false);
			}
			cUndo(canvas, context);
			socket.emit("undo", {
				'erasing': erasing
			});
		}	

		if(e.target.className == "redo") {
			cRedo(canvas, context);
			socket.emit("redo");
		}

		// if(e.target.className == "zoomOut") {
		// 	context.scale(1,1);
		// }
		setColor(context, lineColor);
		socket.emit('cngColor', {
			'color': lineColor
		});
	};

	mapMenu.onclick = function(e) {
		if(e.target.className == "mapIcon") {
			map = e.target.src;
			title = e.target.id;
			toggleMaps();
			clearCanvas(canvas, context);
			changeMap(mapCanvas, mapContext, map, title);
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
		cPush(canvas);
		socket.emit("cpush");
		if(e.which == 1 && student) {
			let rect = canvas.getBoundingClientRect();
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
			pingAnim(context, x, y);
			// socket.emit('ping', {
			// 	'x1': x,
			// 	'y1': y
			// });
			console.log(x,y);
		}
	}

	canvas.onmouseleave = function(e) {
		drawing = false;
	}

	canvas.onmousemove = function(e) {
		let rect = canvas.getBoundingClientRect();

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
			drawLine(context, prevX, prevY, x, y, lineColor, erasing);
			prevX = x;
			prevY = y;
		}
	}
	
	socket.on('draw', function(data) {
		drawLine(context, data.x1, data.y1, data.x2, data.y2, data.color, data.erasing);
	});
	socket.on('cngColor', function(data) {
		setColor(context, data.color);
	});
	socket.on('cngMap', function(data) {
		changeMap(mapCanvas, mapContext, data.map, data.title);
	});
	socket.on('clear', function(data) {
		clearCanvas(canvas, context);
	});
	socket.on('rotate', function(data) {
		setErasing(context, false);
		rotateMap(mapCanvas, mapContext, data.map);
		rotateDrawing(canvas, context, false);
	});
	socket.on('undo', function(data) {
		if (data.erasing) {
			setErasing(context, false);
		}
		cUndo(canvas, context);
	});
	socket.on('redo', function(data) {
		cRedo(canvas, context);
	});
	socket.on('cpush', function(data) {
		cPush(canvas);
	});
	// socket.on('ping', function(data) {
	// 	pingAnim(context, data.x, data.y);
	// });
});