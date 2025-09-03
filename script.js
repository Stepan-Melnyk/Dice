let diceCount = 5; // старт з 5 кубиків
const diceContainer = document.getElementById("dice-container");
const rollBtn = document.getElementById("roll-btn");
const addDiceBtn = document.getElementById("add-dice-btn");
const removeDiceBtn = document.getElementById("remove-dice-btn");

function rollDice() {
  diceContainer.innerHTML = "";
  for (let i = 0; i < diceCount; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    const dice = document.createElement("div");
    dice.classList.add("dice");
    dice.textContent = value;
    diceContainer.appendChild(dice);
  }
}

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

// перший кидок одразу
rollDice();

