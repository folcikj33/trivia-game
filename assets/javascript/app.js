// -----------------------------------------------------------------------
// ----TIMERS-------------------------------------------------------------
// -----------------------------------------------------------------------
// https://www.youtube.com/watch?v=MLtAMg9_Svw some help watching this guy a little here but also from class notes

//set timing variables
var counter = 0;
var questionTime = 30;
var waitTime = 5;
var timerID;

//function to reset both or either timer at intervals during trivia game (see below)
function reset() {
	counter = 0;
	questionTime = 30;
	waitTime = 5;
	clearInterval(timerID);
}

//main timer counts down from 30 as the user attempts to make sense of cryptic trivia questions
// if the 'counter' goes above or equal to thirty seconds, the losing screen is automatically played
// the counter is inverse of what we see because the time counting back is based on the counter incrementing
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

//timer-2 is for in-between questions (right or wrong)
// oce 5 seconds are up, a new question is generated.
// the
function timer2() {
	var timer = $("#timer");
	timer.text(waitTime - counter);
	function time() {
		counter++;
		timer.text(waitTime - counter);
		if (counter >= 5) {
			newQuestion();
		}
	}
	timerID = setInterval(time, 1000);
}

// -----------------------------------------------------------------------
// ---Positive or negative messages random generators---------------------
// -----------------------------------------------------------------------

var right = [
	"Couldn't have clicked it better myself.",
	"I know, right!",
	"I completely agree.",
	"Yes times a thousand.",
	"Word."
];
var wrong = [
	"Wrong!",
	"Nope.",
	"Hm.",
	"Obviously not.",
	"Nice try.",
	"Wow, you're smart!"
];

//this next group generates random response so it's different
var thatRight;
var thatWrong;
function randomizeResponse() {
	thatRight = right[Math.floor(Math.random() * right.length)];
	thatWrong = wrong[Math.floor(Math.random() * wrong.length)];
}

// -----------------------------------------------------------------------
// ---Quiz Itself---------------------------------------------------------
// -----------------------------------------------------------------------
// I would've liked to rely on an API here, but I thought I'd hedge my bets and leave room to
// API-in some Game of Throne-themed gif's at the end as a treat for those lucky enough to guess correctly.
// I'm happy I did because otherwise this would not have gotten done as spiffily in time.

// this is where we will get our questions from
var questionsIndex = [];

// this is where the questions are born and where they shall die
// very maleable format lends itself to easy editing. Each question could come with its own unique images.
var junkyard = [
	{
		question: "In a Twists of Mist, Ned promised Lyanna...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "That he and Robert would avenger her death.",
			choiceB: "That he would lie to her son.",
			choiceC: "That she will see him again when winter comes.",
			choiceD:
				"That he would find her a safe dwelling for her to live in secret.",
			//correct answer will help us compare later
			correct: "b"
		}
	},
	{
		question:
			"What was the word Brienne of Girth screamed as the Pullies without Levers hanged her?",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "Brienne!",
			choiceB: "Catelyn!",
			choiceC: "Tyrion!",
			choiceD: "YeeeOWwwwchie-ouchie-ouch!!",
			correct: "d"
		}
	},
	{
		question: "The best way for the series to end would be...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA:
				"Only more questions will arise once this guise of lies dies.",
			choiceB:
				"The Lord of Light returns from the Shadowlands beyond Asshai to bring a Dream of Spring.",
			choiceC:
				"A small detail changes everything, and the reader's own hunt for turnips and beasts is begun.",
			choiceD:
				"The White Walkers win, everyone and everything dies; and the fleeting, trivial nature of life is realized.",
			correct: "a"
		}
	},
	{
		question: "The best character is...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "Daenerys",
			choiceB: "Sunza",
			choiceC: "Braeyn",
			choiceD: "Tyrone.",
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
			choiceA: "The Little Finger.",
			choiceB: "The Little Imp.",
			choiceC: "The Little Cripple.",
			choiceD: "The Little Prince.",
			correct: "a"
		}
	},
	{
		question: "Varys main job is...",
		imgYes: "",
		imgNo: "",
		answers: {
			choiceA: "To remain obsequious and without scruple.",
			choiceB: "To Protect the realm because, 'someone must.'",
			choiceC: "To be the master of whispers.",
			choiceD: "To keep Syrio's whereabouts well-guarded.",
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

//ri for "random integer" to generate a random question from var questionsIndex array
var ri;
// score to be tallied for every correct answer/guess
var score = 0;
// total to be tallied after every question
var total = 0;

// new question function is called on start button click and after the fanfare/consolation screens
// -reset immediately makes sure the timers are reset no matter where we're coming from
// -container displays are swapped, will hopefully stylize them to fade tonight
// -timer starts from 30
// -ri is generated
// -the questions and choices are all displayed respectively
// -one div is assigned an id attribute with the letter of the correct answer
var newQuestion = function newQuestion() {
	reset();
	$(".container3").attr("style", "display:none");
	$(".container2").attr("style", "display:block");
	timer();
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	$("#question").text(ri.question);
	$("#aText").text(ri.answers.choiceA);
	$("#bText").text(ri.answers.choiceB);
	$("#cText").text(ri.answers.choiceC);
	$("#dText").text(ri.answers.choiceD);
	$(".letters").attr("id", ri.answers.correct);
};

// splices all objects from junkyard and pushes them each into questionsIndex so they can be plucked (see below)
questionReset();

//when the game actually starts. User clicks the start button, the div containers are swapped
// a random integer is selected (perhaps redundant, but I'll mess with it later)
// newQuestion function called
$("#start").click(function() {
	$(".container1").attr("style", "display:none");
	ri = questionsIndex[Math.floor(Math.random() * questionsIndex.length)];
	newQuestion();
});

//as the timer is descending from 30, we wait for a click
// no matter what choice is clicked, this is when we randomize the response of 'wow good job'-s or 'boo you suck'-s
// if if questionsIndext.length is over 0, we will compare the id of the div in the choice class to the selected (ri) correct answer property
// if they're a match, we go to the winning screen, if not we go to consolation screen
// if questionsIndex.length is not greater than 0, then it must be 0, so there won't be any more questions left in the questionsIndex array, so we move onto final page
$(".choices").click(function() {
	randomizeResponse();
	if (questionsIndex.length > 0) {
		if (this.id === ri.answers.correct) {
			fanfare();
		} else {
			consolation();
		}
	} else {
		finalResults();
	}
});

//when we win, we see this
// timers are reset
// displays are swapped
// text is displayed with randomized messages to give off a stunning illusion that I have a personality
// the established ri is pushed back into the junkyard from whence it came
// that same object is ripped out of questionsIndex never to be seen again
// score is incremented as well as total
// timer2 function is called
function fanfare() {
	reset();
	$(".container2").attr("style", "display:none");
	$(".container3").attr("style", "display:block");
	$("#resultText").text(ri.answers.correct + "! " + thatRight);
	junkyard.push(ri);
	questionsIndex.splice(questionsIndex.indexOf(ri), 1);
	score++;
	total++;
	timer2();
}

// same thing but for losers
// timer's reset
// displays are swapped (there's 100% a better way to go about all this I'm sure that but that's okay)
// message is send, ri is pushed to junkyard, object is spliced from questionsIndex
// the total is incremented but not score
// timer2 function is called
function consolation() {
	reset();
	$(".container2").attr("style", "display:none");
	$(".container3").attr("style", "display:block");
	$("#resultText").text(thatWrong + " It was actually " + ri.answers.correct);
	junkyard.push(ri);
	questionsIndex.splice(questionsIndex.indexOf(ri), 1);
	total++;
	timer2();
}

// finally, finally results are displayed with more goofy messaging
// timer is reset yet again just to be sure
// since we're back on container one, the start button is what sets us off into the next game
// last thing here is question reset function, which again pulls all the objects from the junkyard and pushes them into the questionsIndex array
function finalResults() {
	reset();
	$(".container2").attr("style", "display:none");
	$(".container1").attr("style", "display:block");
	$("#finalTally").text("You got " + score + "/" + total + " correct!");
	$("#finalText").text("wow, what was dumb quiz! Try agian?");
	questionReset();
}

//and here's the questions reset function this is probably what ate up most of my time. A whole lot of googling and trial-and-error trying to figure out how to get this right.
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

//https://www.youtube.com/watch?v=49pYIMygIcU
// this guy gave me some guidance, but I only watched him to try to figure out somethings on my own.
// I didn't particularly like all his in-line business or his accent.
// I mostly used what he showed to compare the correct answer
