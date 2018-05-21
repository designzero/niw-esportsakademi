$(document).ready(function() {
	console.log("ready");
	$(".nav-item").click(function () {
		console.log(this);
	    if($(this).hasClass("bg-niw3") == false){
	        $(this).addClass("bg-niw3");
	    }else{
	    $(this).removeClass("bg-niw3");
	    }

	});
});