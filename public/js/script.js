$(document).ready(function() {
	console.log("ready");
	$(".nav-item").click(function () {
	    if($(".nav-item").hasClass("bg-niw3") == true){
	        $(".nav-item").removeClass("bg-niw3");
	    }
	    $(this).addClass("bg-niw3");

	});
});

$("#examine").click(function () {
	
}


$("#check-answers").click(function () {
	$("input+label").removeClass("bg-wrong");
	$("input+label").removeClass("bg-correct");

	$("input:checked").not(".correct").next().addClass("bg-wrong");
	$(".correct:input:checked+label").addClass("bg-correct");
});

// function checkAnswers() {
// 	if ("input:checked").hasClass("correct") {

// 	}
// };