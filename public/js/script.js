$(document).ready(function() {
	
	//------------------------------------------------
	//Buttons
	//------------------------------------------------
	
	$("#btn-edit-lessons").click(function () {
		$(".btn-edit-lesson").toggle();
		$(".btn-edit-lesson-sm").toggle();
	});

	$(".btn-save-notes").click(function () {
		$(".notes-message").fadeToggle();
		setTimeout(function() {
			$(".notes-message").fadeToggle();
		}, 2000);
	});
	
	$(".btn-stats").click(function () {
		if ($(this).is(".btn-settings")) {
			let stats = $(this).parents(".row").find(".student-stats");
			let edit = $(this).parents(".row").find(".student-edit");
			stats.hide();
			edit.show().css("display", "flex");
			$(this).addClass("bg-niw-menu");
			$(this).siblings(".btn-chart").removeClass("bg-niw-menu");
		}
		else {
			$(this).parents(".row").find(".student-edit").hide();
			$(this).parents(".row").find(".student-stats").show().css("display", "block");
			$(this).addClass("bg-niw-menu");
			$(this).siblings(".btn-settings").removeClass("bg-niw-menu");
		}
	});

	//------------------------------------------------
	//Upload
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

	// $("a[href='#tab-video']").click(function () {
	// 	$("#tab-video").css({"position": "relative", "z-index": "1 !important"});
	// });

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


	//------------------------------------------------
	//Tactics
	//------------------------------------------------	

	$("a[href$='#student']").click(function() {
	    if ( $('#studentsmall').css('visibility') == 'hidden' ) {
			$('#studentsmall').css('visibility','visible');
			$('.canvasContainer').removeClass('mx-auto');
		}
		else {
			$('#studentsmall').css('visibility','hidden');
			$('.canvasContainer').addClass('mx-auto');
		}
	});

});
