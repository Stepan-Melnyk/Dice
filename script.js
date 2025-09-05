let diceCount = 2;
const diceContainer = document.getElementById("dice-container");
const rollBtn = document.getElementById("roll-btn");
const addBtn = document.getElementById("add-dice-btn");
const removeBtn = document.getElementById("remove-dice-btn");
const sumBox = document.getElementById("sum-box");
const hideBtn = document.getElementById("hide-btn");

let hidden = false;

const pipPatterns = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function createFace(value, className) {
  const face = document.createElement("div");
  face.classList.add("face", className);

  const grid = document.createElement("div");
  grid.classList.add("pip-grid");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("pip");
    if (pipPatterns[value].includes(i)) {
      cell.textContent = "⚫";
      if (hidden) cell.style.visibility = "hidden"; // приховуємо при потребі
    }
    grid.appendChild(cell);
  }

  face.appendChild(grid);
  return face;
}

function createDice() {
  const dice = document.createElement("div");
  dice.classList.add("dice");

  dice.appendChild(createFace(1, "front"));
  dice.appendChild(createFace(2, "back"));
  dice.appendChild(createFace(3, "right"));
  dice.appendChild(createFace(4, "left"));
  dice.appendChild(createFace(5, "top"));
  dice.appendChild(createFace(6, "bottom"));

  return dice;
}

// Універсальна функція для будь-якої кількості кубиків
function renderDice() {
  diceContainer.innerHTML = "";

  const topRow = document.createElement("div");
  topRow.classList.add("row");
  const bottomRow = document.createElement("div");
  bottomRow.classList.add("row");

  const topCount = Math.ceil(diceCount / 2);
  const bottomCount = diceCount - topCount;

  for (let i = 0; i < topCount; i++) topRow.appendChild(createDice());
  for (let i = 0; i < bottomCount; i++) bottomRow.appendChild(createDice());

  diceContainer.appendChild(topRow);
  if (bottomRow.children.length) diceContainer.appendChild(bottomRow);
}

function rollDice() {
  let sum = 0;
  document.querySelectorAll(".dice").forEach(dice => {
    const value = Math.floor(Math.random() * 6) + 1;
    sum += value;

    let x = 0, y = 0;
    switch(value) {
      case 1: x = 0; y = 0; break;
      case 2: x = 0; y = 180; break;
      case 3: x = 0; y = -90; break;
      case 4: x = 0; y = 90; break;
      case 5: x = -90; y = 0; break;
      case 6: x = 90; y = 0; break;
    }

    dice.style.transform = `rotateX(${x + 360}deg) rotateY(${y + 360}deg)`;
  });
  sumBox.textContent = sum;
}

// Кнопки
rollBtn.addEventListener("click", rollDice);

addBtn.addEventListener("click", () => {
  diceCount++;
  renderDice();
});

removeBtn.addEventListener("click", () => {
  if (diceCount > 1) {
    diceCount--;
    renderDice();
  }
});

hideBtn.addEventListener("click", () => {
  hidden = !hidden;
  document.querySelectorAll(".pip").forEach(pip => {
    pip.style.visibility = hidden ? "hidden" : "visible";
  });
  hideBtn.textContent = hidden ? "Показати" : "Приховати";
});

// Початковий рендер
renderDice();

  
  