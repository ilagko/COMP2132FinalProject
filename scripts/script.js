const playerDice1 = document.getElementById('playerDice1');
const playerDice2 = document.getElementById('playerDice2');
const computerDice1 = document.getElementById('computerDice1');
const computerDice2 = document.getElementById('computerDice2');
const playerRoundScoreElement = document.getElementById('playerRoundScore');
const computerRoundScoreElement = document.getElementById('computerRoundScore');
const playerTotalScoreElement = document.getElementById('playerTotalScore');
const computerTotalScoreElement = document.getElementById('computerTotalScore');
const rollButton = document.getElementById('rollButton');
const resetButton = document.getElementById('resetButton');
const winnerMessage = document.getElementById('winnerMessage');
const rulesButton = document.getElementById('rulesButton');
const rulesSection = document.getElementById('rulesSection');

const diceGame = {
    playerTotalScore: 0,
    computerTotalScore: 0,
    rollCount: 0,

    rollDie: function() {
        return Math.floor(Math.random() * 6) + 1;
    },

    calculateScore: function(die1, die2) {
        if (die1 === 1 || die2 === 1) {
            return 0;
        } else if (die1 === die2) {
            return (die1 + die2) * 2;
        } else {
            return die1 + die2;
        }
    },

    updateDiceImages: function(die1, die2, dice1Element, dice2Element) {
        dice1Element.src = `../images/dice${die1}.png`;
        dice2Element.src = `../images/dice${die2}.png`;
    },

    playRound: function() {
        let playerDie1 = this.rollDie();
        let playerDie2 = this.rollDie();
        let computerDie1 = this.rollDie();
        let computerDie2 = this.rollDie();

        this.updateDiceImages(playerDie1, playerDie2, playerDice1, playerDice2);
        this.updateDiceImages(computerDie1, computerDie2, computerDice1, computerDice2);

        let playerScore = this.calculateScore(playerDie1, playerDie2);
        let computerScore = this.calculateScore(computerDie1, computerDie2);

        playerRoundScoreElement.textContent = playerScore;
        computerRoundScoreElement.textContent = computerScore;

        this.playerTotalScore += playerScore;
        this.computerTotalScore += computerScore;

        playerTotalScoreElement.textContent = this.playerTotalScore;
        computerTotalScoreElement.textContent = this.computerTotalScore;

        this.rollCount++;

        if (this.rollCount >= 3) {
            this.determineWinner();
        }
    },

    determineWinner: function() {
        rollButton.disabled = true;
        if (this.playerTotalScore > this.computerTotalScore) {
            winnerMessage.textContent = 'Player wins!';
        } else if (this.playerTotalScore < this.computerTotalScore) {
            winnerMessage.textContent = 'Computer wins!';
        } else {
            winnerMessage.textContent = 'It\'s a draw!';
        }
    },

    resetGame: function() {
        this.playerTotalScore = 0;
        this.computerTotalScore = 0;
        this.rollCount = 0;
        playerRoundScoreElement.textContent = '0';
        computerRoundScoreElement.textContent = '0';
        playerTotalScoreElement.textContent = '0';
        computerTotalScoreElement.textContent = '0';
        winnerMessage.textContent = '';
        rollButton.disabled = false;
    }
};

// Event listeners
rollButton.addEventListener('click', () => diceGame.playRound());
resetButton.addEventListener('click', () => diceGame.resetGame());

rulesButton.addEventListener('click', () => {
    if (rulesSection.classList.contains('hidden')) {
        rulesSection.classList.remove('hidden');
        rulesSection.style.height = 'auto';
        let height = rulesSection.clientHeight + 'px';
        rulesSection.style.height = '0px';
        setTimeout(() => {
            rulesSection.style.height = height;
        }, 0);
    } else {
        rulesSection.style.height = '0px';
        rulesSection.addEventListener('transitionend', () => {
            rulesSection.classList.add('hidden');
        }, { once: true });
    }
});

diceGame.determineWinner = function() {
    rollButton.disabled = true;
    let winnerText = '';
    if (this.playerTotalScore > this.computerTotalScore) {
        winnerText = 'Player wins!';
        document.getElementById('winAudio').play(); // Play the win audio
    } else if (this.playerTotalScore < this.computerTotalScore) {
        winnerText = 'Computer wins!';
    } else {
        winnerText = 'It’s a draw!';
    }
    winnerMessage.textContent = winnerText;
    winnerMessage.classList.add('show'); // Show with animation
};


diceGame.resetGame = function() {
    this.playerTotalScore = 0;
    this.computerTotalScore = 0;
    this.rollCount = 0;
    playerRoundScoreElement.textContent = '0';
    computerRoundScoreElement.textContent = '0';
    playerTotalScoreElement.textContent = '0';
    computerTotalScoreElement.textContent = '0';
    winnerMessage.textContent = '';
    winnerMessage.classList.remove('show'); // Hide
    rollButton.disabled = false;
};
