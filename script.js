// =========================================
// GET HTML ELEMENTS
// =========================================

const playerDice =
    document.getElementById("playerDice");

const computerDice =
    document.getElementById("computerDice");

const playerScoreElement =
    document.getElementById("playerScore");

const computerScoreElement =
    document.getElementById("computerScore");

const resultElement =
    document.getElementById("result");

const rollButton =
    document.getElementById("rollBtn");

const resetButton =
    document.getElementById("resetBtn");


// =========================================
// GAME VARIABLES
// =========================================

let playerScore = 0;
let computerScore = 0;

let gameOver = false;

// Used to cancel old animations/timers
let roundId = 0;


// =========================================
// INITIAL DICE
// =========================================

playerDice.dataset.number = 1;

computerDice.dataset.number = 1;


// =========================================
// ROLL DICE
// =========================================

function rollDice() {

    // Don't allow rolling after game over

    if (gameOver) {
        return;
    }


    // Disable roll button

    rollButton.disabled = true;


    // Create a unique ID for this round

    const currentRound = ++roundId;


    // Display message

    resultElement.textContent =
        "Rolling...";


    // Generate random values

    const playerNumber =
        Math.floor(Math.random() * 6) + 1;

    const computerNumber =
        Math.floor(Math.random() * 6) + 1;


    // =====================================
    // PLAYER DICE
    // =====================================

    playerDice.classList.add("rolling");


    setTimeout(() => {

        // Stop if this round was cancelled

        if (currentRound !== roundId) {
            return;
        }


        // Show player result

        playerDice.dataset.number =
            playerNumber;


        playerDice.classList.remove(
            "rolling"
        );


        // =================================
        // COMPUTER DELAY
        // =================================

        setTimeout(() => {

            // Stop if this round was cancelled

            if (currentRound !== roundId) {
                return;
            }


            // Computer starts rolling

            computerDice.classList.add(
                "rolling"
            );


            setTimeout(() => {

                // Stop if this round was cancelled

                if (currentRound !== roundId) {
                    return;
                }


                // Show computer result

                computerDice.dataset.number =
                    computerNumber;


                computerDice.classList.remove(
                    "rolling"
                );


                // =================================
                // CHECK ROUND WINNER
                // =================================

                if (
                    playerNumber >
                    computerNumber
                ) {

                    playerScore++;

                    resultElement.textContent =
                        "🎉 You Win This Round!";

                }

                else if (
                    computerNumber >
                    playerNumber
                ) {

                    computerScore++;

                    resultElement.textContent =
                        "💻 Computer Wins This Round!";

                }

                else {

                    resultElement.textContent =
                        "🤝 It's a Draw!";
                }


                // =================================
                // UPDATE SCORE
                // =================================

                playerScoreElement.textContent =
                    "Score: " + playerScore;

                computerScoreElement.textContent =
                    "Score: " + computerScore;


                // =================================
                // CHECK GAME OVER
                // =================================

                if (playerScore >= 10) {

                    gameOver = true;

                    resultElement.textContent =
                        "🏆 Congratulations! You Won the Game!";

                    rollButton.disabled = true;

                }

                else if (computerScore >= 10) {

                    gameOver = true;

                    resultElement.textContent =
                        "😢 Computer Won the Game!";

                    rollButton.disabled = true;

                }

                else {

                    rollButton.disabled = false;
                }

            }, 800);

        }, 300);

    }, 800);
}


// =========================================
// RESET GAME
// =========================================

function resetGame() {

    // Invalidate the current round

    roundId++;


    // Reset scores

    playerScore = 0;

    computerScore = 0;


    // Reset game state

    gameOver = false;


    // Remove animations

    playerDice.classList.remove(
        "rolling"
    );

    computerDice.classList.remove(
        "rolling"
    );


    // Reset dice

    playerDice.dataset.number = 1;

    computerDice.dataset.number = 1;


    // Reset score display

    playerScoreElement.textContent =
        "Score: 0";

    computerScoreElement.textContent =
        "Score: 0";


    // Reset result

    resultElement.textContent =
        "Click Roll Dice to Start!";


    // Enable roll button

    rollButton.disabled = false;
}


// =========================================
// BUTTON EVENTS
// =========================================

rollButton.addEventListener(
    "click",
    rollDice
);


resetButton.addEventListener(
    "click",
    resetGame
);