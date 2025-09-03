let diceCount = 5; // старт з 5 кубиків
const diceContainer = document.getElementById("dice-container");
const rollBtn = document.getElementById("roll-btn");
const addDiceBtn = document.getElementById("add-dice-btn");
const removeDiceBtn = document.getElementById("remove-dice-btn");

// додаємо кнопку "Приховати"
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Приховати";
document.querySelector(".buttons").appendChild(toggleBtn);

let showDice = true; // показувати значення кубиків

const diceEmojis = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
const resultDisplay = document.createElement("div");
resultDisplay.id = "result";
diceContainer.after(resultDisplay);

function rollDice() {
  diceContainer.innerHTML = "";
  let sum = 0;

  for (let i = 0; i < diceCount; i++) {
    const value = Math.floor(Math.random() * 6);
    sum += value + 1;

    const dice = document.createElement("div");
    dice.classList.add("dice", "roll");
    dice.dataset.value = diceEmojis[value]; // зберігаємо значення для приховування
    dice.textContent = showDice ? diceEmojis[value] : "❔";
    diceContainer.appendChild(dice);

    dice.addEventListener("animationend", () => {
      dice.classList.remove("roll");
    });
  }

  resultDisplay.textContent = showDice ? `Сума: ${sum}` : "Сума: ???";
}

// кнопки
rollBtn.addEventListener("click", rollDice);
addDiceBtn.addEventListener("click", () => {
  diceCount++;
  rollDice();
});
removeDiceBtn.addEventListener("click", () => {
  if (diceCount > 1) {
    diceCount--;
    rollDice();
  }
});

// кнопка "Приховати"
toggleBtn.addEventListener("click", () => {
  showDice = !showDice;
  const diceElements = document.querySelectorAll(".dice");
  diceElements.forEach(dice => {
    dice.textContent = showDice ? dice.dataset.value : "❔";
  });
  // оновлюємо суму
  rollDice();
});

// перший кидок одразу
rollDice();
