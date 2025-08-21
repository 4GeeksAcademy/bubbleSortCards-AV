import "bootstrap";
import "./style.css";

window.onload = function () {
  console.log("Consola funcionando al 100");

  const drawBtn = document.getElementById("sortBtn");
  const ordBtn = document.getElementById("ordBtn");
  const table = document.getElementById("table");
  const changes = document.getElementById("changes");
  const numCardsInput = document.getElementById("numCards");

  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  let current = [];
  let regChanges = [];

  function randomCard() {
    const value = values[Math.floor(Math.random() * values.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return { value, suit };
  }

  function getCard(n) {
    const newCard = [];
    for (let i = 0; i < n; i++) {
      newCard.push(randomCard());
    }
    return newCard;
  }


  function renderCard(card) {
    const div = document.createElement("div");
    div.classList.add("card", "border", "p-2", "text-center");
    div.style.width = "120px";
    div.style.height = "180px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.fontSize = "20px";
    div.style.borderRadius = "8px";
    div.style.background = "#fff";
    div.style.color = (card.suit === "♥" || card.suit === "♦") ? "red" : "black";
    div.innerHTML = `${card.value} <br>${card.suit}`;
    return div;
  }

  function renderArrCards(arrCards, container) {
    container.innerHTML = "";
    arrCards.forEach(card => {
      container.appendChild(renderCard(card));
    });
  }


  function bubbleSort(array) {
    const arr = [...array];
    const valueMap = { "A": 1, "J": 11, "Q": 12, "K": 13 };

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        const a = valueMap[arr[j].value] || parseInt(arr[j].value);
        const b = valueMap[arr[j + 1].value] || parseInt(arr[j + 1].value);


        if (a < b) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          regChanges.push([...arr]);
        }
      }
    }
    return arr;
  }

  drawBtn.addEventListener("click", () => {
    const n = parseInt(numCardsInput.value);
    if (!n || n <= 0) return alert("Ingresa un número válido");

    current = getCard(n);
    regChanges = [];
    renderArrCards(current, table);
    changes.innerHTML = "<h4>Registro de cambios:</h4>";
  });

  ordBtn.addEventListener("click", () => {
    if (!current.length) return alert("Genera primero las cartas");

    bubbleSort(current);

    changes.innerHTML = "<h4>Registro de cambios:</h4>";
    regChanges.forEach((change, i) => {
      const changeDiv = document.createElement("div");
      changeDiv.classList.add("my-1");
      changeDiv.textContent = `Paso ${i + 1}: ${change.map(c => c.value + c.suit).join(" ")}`;
      changes.appendChild(changeDiv);
    });

    renderArrCards(regChanges[regChanges.length - 1], table);
  });
};
