$(document).ready(function() {
	console.log("ready");
	$(".nav-item").click(function () {
	    if($(".nav-item").hasClass("bg-niw3") == true){
	        $(".nav-item").removeClass("bg-niw3");
	    }
	    $(this).addClass("bg-niw3");

	});
});