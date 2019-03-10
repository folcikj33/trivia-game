// var consolation = {
// 	message: "Wrong!",
// 	correction:
// 		'The correct answer was obviously,"' +
// 		ri.answers.correct +
// 		'," according to me. Sorry!',
// 	img: ""
// };

var questionsIndex2 = [];

var questionsIndex = [
	{
		question:
			"Given what we know, it's most likely Ned promised his sister...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "That he and Robert would avenger her death.",
			choiceB: "That he would lie to protect her son.",
			choiceC: "That she will see him again when winter comes.",
			choiceD:
				"That he would find her a safe dwelling for her to live in secret.",
			correct: "b"
		}
	},
	{
		question:
			"Which word is most plausible, the one that Brienne as the Brothers without Banners hanged her?",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "Brienne!",
			choiceB: "Catelyn!",
			choiceC: "Tyrion!",
			choiceD: "Kingslayer!",
			correct: "d"
		}
	},
	{
		question: "The best way for the series to end would be...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "I really just don't know.",
			choiceB:
				"The Lord of Light returns from the Shadowlands beyond Asshai to bring a Dream for Spring.",
			choiceC:
				"A small detail changes everything, and the reader's hunt for moral truth is beckoned.",
			choiceD:
				"The White Walkers win, the long night returns, and the Game of Throne's triviality is realized.",
			correct: "a"
		}
	},
	{
		question: "The best character is...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "Tyrion",
			choiceB: "Arya",
			choiceC: "Bran",
			choiceD:
				"I don't understand the question, and I won't respond to it.",
			correct: "d"
		}
	},
	{
		question: "My favorite book was...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "A Game of Thrones",
			choiceB: "A Clash of Kings",
			choiceC: "A Storm of Swords",
			choiceD: "A Dance with Dragons",
			correct: "a"
		}
	},
	{
		question: "Jake's favorite Bran chapter is...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "When he first wargs into Hodor",
			choiceB: "When he feels what Jaime does for love.",
			choiceC: "When he spreads his arms, and flew.",
			choiceD: "When he's Summer for the first time.",
			correct: "c"
		}
	},
	{
		question: "I wish the show had...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "More sex!",
			choiceB: "More Stoneheart!",
			choiceC: "More dragons!",
			choiceD: "More battles!",
			correct: "b"
		}
	},
	{
		question: "Given what we know, the Valyrian dagger belonged to...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "Petyr Baelish, all along.",
			choiceB: "Tyrion, all along.",
			choiceC: "Joffrey, all along.",
			choiceD: "Bran, all along.",
			correct: "a"
		}
	},
	{
		question: "The spider's main job is...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "To remain obsequious and without scruple.",
			choiceB: "To Protect the realm... someone must.",
			choiceC: "To be the master of whispers.",
			choiceD: "Yes.",
			correct: "d"
		}
	},
	{
		question: "If I were a character in game of thrones, I'd be...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "Arya",
			choiceB: "A highborn lordling",
			choiceC: "A bastard with the surname Snow",
			choiceD: "A back-ally sally.",
			correct: "d"
		}
	}
];

// var currentQ = runningQ[runningQ.length - 1];

var junkyard = [];
var ri;
// questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
var score = 0;
var total = 0;

// var checkAnswer = function checkAnswer() {
// 	if (this == ri.answers.correct) {
// 		console.log("you did it!");
// 	} else if (this !== ri.answers.correct) {
// 		console.log("you suck!");
// 	} else {
// 		console.log("neither happened");
// 	}
// };

var newQuestion = function newQuestion() {
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	$("#question").text(ri.question);
	$("#aText").text(ri.answers.choiceA);
	$("#bText").text(ri.answers.choiceB);
	$("#cText").text(ri.answers.choiceC);
	$("#dText").text(ri.answers.choiceD);
	$(".letters").attr("id", ri.answers.correct);
	// $(questionsIndex.popri));
	console.log(ri.answers.correct);
};

$("#nextBtn").click(function() {
	$(".container3").attr("style", "display:none");
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	$(".container2").attr("style", "display:block");
	newQuestion();
});

$("#start").click(function() {
	$(".container1").attr("style", "display:none");
	$(".container2").attr("style", "display:block");
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	jokerReset();
	console.log(junkyard);
	// newQuestion();
});

$(".choices").click(function() {
	if (questionsIndex.length > 1) {
		if (this.id === ri.answers.correct) {
			fanfare();
		} else {
			consolation();
		}
	} else {
		finalresults();
	}
});

function fanfare() {
	$(".container2").attr("style", "display:none");
	$(".container3").attr("style", "display:block");
	$("#resultText").text("My thoughts exactly!");
	junkyard.push(ri);
	questionsIndex.splice(questionsIndex.indexOf(ri), 1);
	score++;
	total++;
}

function consolation() {
	$(".container2").attr("style", "display:none");
	$(".container3").attr("style", "display:block");
	$("#resultText").text("Wrong!");
	junkyard.push(ri);
	questionsIndex.splice(questionsIndex.indexOf(ri), 1);
	score--;
}

function finalResults() {}

function timeConverter(timeStamp) {
	var minutes = Math.floor(timeStamp / 60);
	var seconds = timeStamp - minutes * 60;

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	if (minutes === 0) {
		minutes = "00";
	} else if (minutes < 10) {
		minutes = "" + minutes;
	}
	return minutes + ":" + seconds;
}

function questionReset() {
	for (i = 0; i <= junkyard.length; i++) {
		questionsIndex.push(junkyard[i]);
		junkyard.splice(junkyard[i]);
	}
}

function jokerReset() {
	for (i = 0; i >= 0; i++) {
		console.log(questionsIndex.length);
		console.log(junkyard);

		questionsIndex.splice(0, 1);
		junkyard.push(questionsIndex[i]);
		console.log(questionsIndex.length);
		console.log(junkyard);
	}
}
