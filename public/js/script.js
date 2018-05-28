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

	var bar;

	$("a[href='#upload-progress']").click(function(e){
		
		// bar = ($(".progress").width()) / ($('.progress').parent().width() * 100);
  // 		// console.log(bar);

		// while (bar < 100) {
		// 	console.log(bar);
		// 	bar = ($(".progress").width()) / ($('.progress').parent().width() * 100);
		//   	$(".progress-bar").text($(".progress").width());
		// };
		
		setTimeout(function() {
			bar = $(".progress").width();
			console.log(bar);
			$('#videoUploadModal').modal();
		}, 1500);
	});

	$("a[href='#add-question']").click(function(e){
		$(".question-add:first").clone(true).insertAfter(".question-add:last");
		$(".question-add:last .added-answer").remove();
	});

	$("a[href='#remove-question']").click(function(e){
		if ($(".question-add").length <= 1) {
			$(e.target).parents(".question-add").find(".added-answer").remove();
		}
		else {
			$(e.target).parents(".question-add").remove();
		}	
	});


	$(".btn-add-answer").click(function(e){
		let lastAnswer = $(e.target).parents(".question-add").find(".answer-add:last");
		let lastAnswerText = $(e.target).parents(".question-add").find(".answer-add:last > input").attr("placeholder");
		$(lastAnswer).clone(true).insertAfter($(e.target).parents(".question-add").find(".answer-add:last"));

		lastAnswer = $(e.target).parents(".question-add").find(".answer-add:last");
		
		$(lastAnswer).addClass("added-answer");
		$(lastAnswer).children("input").attr("placeholder", "Svar " + (parseInt(lastAnswerText.slice(4)) + 1));
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
