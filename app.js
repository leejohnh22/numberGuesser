/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain number of guesses
- Notify player of remaining number of guesses
- Notify player of the correct answer if they lose
- Notify player if they win
- Let player choose to play again
*/

// Game values
let min = 1,
	max = 10,
	winningNum = getRandNum(min, max),
	guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessInput = document.querySelector('#guess-input'),
	guessBtn = document.querySelector('#guess-btn'),
	message = document.querySelector('.message');

// Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

// Randomize game values

// Play Again event listener
game.addEventListener('mousedown', function(e){
	// If click the Play Again button
	if(e.target.className === 'play-again'){
		// Reload the page
		window.location.reload();
	}
})

// Event listener for guess submission
guessBtn.addEventListener('click', function(){
	let guess = parseInt(guessInput.value); // truncate floats

	// Validate input
	if (isNaN(guess) || guess < min || guess > max){
		// Game end
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	} else {
		// Check if won
		if (guess === winningNum) {
			// Game WON
			gameOver(true, `${winningNum} is correct. YOU WIN!`);
		} else {
			// Guessed wrong number
			guessesLeft -= 1;

			if(guessesLeft === 0) {
				// Game LOST
				gameOver(false, `Game over, you lost. The correct number was ${winningNum}.`);
			} else {
				// Game Continues - answer wrong
				// Border red
				guessInput.style.borderColor = 'red';
				// Clear input
				guessInput.value = '';
				// Notify user number of guesses left
				setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left`, 'black');	
			}
		}
	}
})

// Game over
function gameOver(won, msg){
	let color;
	// if win, border is green, else its red
	won == true ? color = 'green' : color = 'red';

	// Disable input
	guessInput.disabled = true;
	// Set border color
	guessInput.style.borderColor = color;
	// Set text color
	message.style.color = color;
	// Message notification
	setMessage(msg);

	// Play again?
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// Randomize Winning Number
function getRandNum(min, max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color){
	message.textContent = msg;
	message.style.color = color;
}