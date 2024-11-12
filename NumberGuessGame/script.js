document.addEventListener("DOMContentLoaded", () => {
   
    const app = document.getElementById("app");
    const container = document.createElement("div");
    container.className = "container";
    app.appendChild(container);

   
    const instructions = document.createElement("div");
    instructions.className = "instructions";
    instructions.innerHTML = `
        <h2>Instructions of the Game:</h2>
        <ul>
            <li>Guess the number by typing it in the input field</li>
            <li>Color changes to Yellow if the guessed number is smaller</li>
            <li>Color changes to Red if the guessed number is greater</li>
            <li>Color changes to Green if the guessed number is correct</li>
            <li>Maximum attempts allowed is 6</li>
        </ul>
    `;
    container.appendChild(instructions);

   
    const setupArea = document.createElement("div");
    setupArea.className = "setup-area";
    setupArea.innerHTML = `
        <label for="circleCount">Enter the number of circles:</label>
        <input type="number" id="circleCount" min="1" max="20" value="10">
        <button id="createCirclesButton">Create Circles</button>
    `;
    container.appendChild(setupArea);

    
    const gameArea = document.createElement("div");
    gameArea.className = "game-area";
    container.appendChild(gameArea);

    const guessInput = document.createElement("input");
    guessInput.type = "number";
    guessInput.id = "guessInput";
    guessInput.placeholder = "Enter your guess";
    guessInput.disabled = true;
    gameArea.appendChild(guessInput);

    const numberCircles = document.createElement("div");
    numberCircles.className = "number-circles";
    numberCircles.id = "numberCircles";
    gameArea.appendChild(numberCircles);

    const guessButton = document.createElement("button");
    guessButton.id = "guessButton";
    guessButton.textContent = "Guess";
    guessButton.disabled = true;
    gameArea.appendChild(guessButton);

    const attemptsText = document.createElement("p");
    attemptsText.id = "attempts";
    attemptsText.textContent = "Attempt No.: 0";
    gameArea.appendChild(attemptsText);

    const resultText = document.createElement("p");
    resultText.id = "result";
    gameArea.appendChild(resultText);

 
    let correctNumber;
    let attempts = 0;
    const maxAttempts = 6;

    document.getElementById("createCirclesButton").addEventListener("click", () => {
        const circleCount = parseInt(document.getElementById("circleCount").value);
        numberCircles.innerHTML = ""; 

        for (let i = 1; i <= circleCount; i++) {
            const circle = document.createElement("span");
            circle.className = "circle";
            circle.id = `circle${i}`;
            circle.textContent = i;
            numberCircles.appendChild(circle);
        } 
        guessInput.disabled = false;
        guessButton.disabled = false;
        correctNumber = Math.floor(Math.random() * circleCount) + 1;
        attempts = 0;
        attemptsText.textContent = "Attempt No.: 0";
        resultText.textContent = "";

       
        guessInput.value = "";
    });

    guessButton.addEventListener("click", () => {
        const guessedNumber = parseInt(guessInput.value);
        if (isNaN(guessedNumber)) {
            resultText.textContent = "Please enter a valid number!";
            return;
        }

        attempts++;
        attemptsText.textContent = `Attempt No.: ${attempts}`;
        const circles = document.querySelectorAll(".circle");

       
        circles.forEach(circle => circle.style.backgroundColor = "#87ceeb");

        if (guessedNumber < correctNumber) {
            if (document.getElementById(`circle${guessedNumber}`)) {
                document.getElementById(`circle${guessedNumber}`).style.backgroundColor = "yellow";
            }
            resultText.textContent = "Try a higher number!";
        } else if (guessedNumber > correctNumber) {
            if (document.getElementById(`circle${guessedNumber}`)) {
                document.getElementById(`circle${guessedNumber}`).style.backgroundColor = "red";
            }
            resultText.textContent = "Try a lower number!";
        } else {
            if (document.getElementById(`circle${guessedNumber}`)) {
                document.getElementById(`circle${guessedNumber}`).style.backgroundColor = "green";
            }
            resultText.textContent = `You Win! Correct number guessed in ${attempts} attempts!`;
            guessInput.disabled = true;
            guessButton.disabled = true;
        }

        if (attempts >= maxAttempts && guessedNumber !== correctNumber) {
            resultText.textContent = "Game Over! You've used all attempts.";
            guessInput.disabled = true;
            guessButton.disabled = true;
        }
    });
});
