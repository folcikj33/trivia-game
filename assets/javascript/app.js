// var consolation = {
// 	message: "Wrong!",
// 	correction:
// 		'The correct answer was obviously,"' +
// 		ri.answers.correct +
// 		'," according to me. Sorry!',
// 	img: ""
// };

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

var counter = 0;
function reset() {
	counter = 0;
	questionTime = 30;
	clearInterval(timerID);
}
var questionTime = 30;

function timer() {
	var clock = $("#clock");
	clock.text(questionTime - counter);

	function time() {
		counter++;
		clock.text(questionTime - counter);
		if (counter >= 30) {
			consolation();
		}
	}
	timerID = setInterval(time, 1000);
}

var junkyard = [
	{
		question: "Ned promised her...",
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
			"What was the word Brienne screamed as the Brothers without Banners hanged her?",
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
			choiceA: "Grrm was McCumber the whole time.",
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
		question: "The best was...",
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
		question: "Chicken, turtle stew, flagons, of gravy...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "...turnips, mashed beats and lamprey pie...,",
			choiceB: "... smoked ham with garlic-roast unions...,",
			choiceC: "...a plump, sugary lemon-cake...,",
			choiceD: "... and some hot mulled wine to wash it down.",
			correct: "c"
		}
	},
	{
		question: "The show needs...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "More battles!",
			choiceB: "More Stoneheart!",
			choiceC: "More dragons!",
			choiceD: "More nudity!",
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
		question: "Varys main job is...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "To remain obsequious and without scruple.",
			choiceB: "To Protect the realm... someone must.",
			choiceC: "To be the master of whispers.",
			choiceD: "To not tell anyone where Syrio is.",
			correct: "d"
		}
	},
	{
		question: "The last book will come out...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "When the sun rises in the west and sets in the east",
			choiceB: "when the rivers run dry",
			choiceC: "And the mountains blow in the wind like leaves.",
			choiceD: "Hodor",
			correct: "d"
		}
	}
];

var questionsIndex = [];
var ri;
// questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
var score = 0;
var total = 0;

var newQuestion = function newQuestion() {
	$(".container3").attr("style", "display:none");
	$(".container2").attr("style", "display:block");
	timer();
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	// reset1();
	// $("clock").text(time);
	$("#question").text(ri.question);
	$("#aText").text(ri.answers.choiceA);
	$("#bText").text(ri.answers.choiceB);
	$("#cText").text(ri.answers.choiceC);
	$("#dText").text(ri.answers.choiceD);
	$(".letters").attr("id", ri.answers.correct);
};

questionReset();
$("#start").click(function() {
	$(".container1").attr("style", "display:none");
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	newQuestion();
});

$(".choices").click(function() {
	if (questionsIndex.length > 1) {
		if (this.id === ri.answers.correct) {
			fanfare();
		} else {
			consolation();
		}
	} else {
		finalResults();
	}
});

function fanfare() {
	reset();
	$(".container2").attr("style", "display:none");
	$(".container3").attr("style", "display:block");
	$("#resultText").text("My thoughts exactly!");
	junkyard.push(ri);
	questionsIndex.splice(questionsIndex.indexOf(ri), 1);
	score++;
	total++;
	$("#timer").append(setTimeout(newQuestion, 5000));
}

function consolation() {
	reset();
	$(".container2").attr("style", "display:none");
	$(".container3").attr("style", "display:block");
	$("#resultText").text("Wrong!");
	junkyard.push(ri);
	questionsIndex.splice(questionsIndex.indexOf(ri), 1);
	setTimeout(newQuestion, 5000);
}

function finalResults() {
	$(".container2").attr("style", "display:none");
	$(".container1").attr("style", "display:block");
	$("#finalTally").text("You got " + score + "/" + total + " correct!");
	$("#finalText").text("wow, what was dumb quiz! Try agian?");
	questionReset();
}

function questionReset() {
	for (i = 0; i < 10; i++) {
		// console.log(questionsIndex);
		// console.log(junkyard);
		questionsIndex.push(junkyard[i]);
	}
	for (i = 0; i < 10; i++) {
		junkyard.splice(junkyard[i], 1);
	}
}
