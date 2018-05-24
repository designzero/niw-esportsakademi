$(document).ready(function() {
	
	//------------------------------------------------
	//Navbar
	//------------------------------------------------
	
	// $(".nav-item").click(function () {
	//     if($(".nav-item").hasClass("bg-niw-menu") == true){
	//         $(".nav-item").removeClass("bg-niw-menu");
	//     }
	//     $(this).addClass("bg-niw-menu");

	// });


	$(".btn-stats").click(function () {
		if ($(this).is("#btn-settings")) {
			$("#student-stats").hide();
			$("#student-edit").show().css("display", "flex");
			$(this).addClass("bg-niw-menu");
			$("#btn-chart").removeClass("bg-niw-menu");
		}
		else {
			$("#student-edit").hide();
			$("#student-stats").show().css("display", "block");
			$(this).addClass("bg-niw-menu");
			$("#btn-settings").removeClass("bg-niw-menu");
		}
	});

	//------------------------------------------------
	//Quiz
	//------------------------------------------------
	
	$("input[type='radio']").click(function () {
		$(this).next("label").removeClass("bg-noselect");
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
