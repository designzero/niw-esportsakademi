$(document).ready(function() {
	
	//------------------------------------------------
	//Navbar
	//------------------------------------------------
	
	$(".nav-item").click(function () {
	    if($(".nav-item").hasClass("bg-niw3") == true){
	        $(".nav-item").removeClass("bg-niw3");
	    }
	    $(this).addClass("bg-niw3");

	});

	//------------------------------------------------
	//Quiz
	//------------------------------------------------
	
	$("input[type='radio']").click(function () {
		$(this).parent().siblings().find("label").addClass("bg-noselect");
	});

	$("#check-answers").click(function () {
		let correctAmount = $(".correct:input:checked+label").length;

		$("#numberCorrect").text(correctAmount);

		$("input+label").removeClass("bg-wrong");
		$("input+label").removeClass("bg-correct");

		$("input:checked").not(".correct").next().addClass("bg-wrong");
		$(".correct:input:checked+label").addClass("bg-correct");
	});
});
