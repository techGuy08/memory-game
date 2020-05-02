document.addEventListener("DOMContentLoaded", () => {
  //card options
  const gameCards = [
    {
      name: "apple",
      img: "images/apple.png",
      isFound: false,
    },
    {
      name: "banana",
      img: "images/banana.png",
      isFound: false,
    },
    {
      name: "blackberry",
      img: "images/blackberry.png",
      isFound: false,
    },
    {
      name: "mango",
      img: "images/mango.png",
      isFound: false,
    },
    {
      name: "orange",
      img: "images/orange.png",
      isFound: false,
    },
    {
      name: "pineapple",
      img: "images/pineapple.png",
      isFound: false,
    },
  ];

  const cardArray = [...gameCards, ...gameCards];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const topScore = document.querySelector("#topScore");
  const msgElement = document.querySelector("#msg");

  var cardsChosen = [];
  var score = 0;
  var matchFound = 0;
  var hightestScore = 0;
  //create your board
  function NewBoardGame() {
    grid.innerHTML = "";
    resultDisplay.innerHTML = "";
    score = 0;
    matchFound = 0;
    resultDisplay.textContent = score;
    let playAgainBtn = document.querySelector("#playAgain");
    if (playAgainBtn) playAgainBtn.remove();
    cardArray.sort(() => 0.5 - Math.random());
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", cardArray[i].img);
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
      cardArray[i].isFound = false;
    }
    setTimeout(function () {
      document.querySelectorAll(".grid > img").forEach(function (img) {
        img.setAttribute("src", "images/blank.png");
      });
    }, 2000);
  }

  //check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const cardOne = cardsChosen[0];
    const cardTwo = cardsChosen[1];
    if (cardArray[cardOne].name === cardArray[cardTwo].name) {
      showMsg("You found a match");
      cards[cardOne].setAttribute("src", "images/white.png");
      cards[cardTwo].setAttribute("src", "images/white.png");
      score += 5;
      matchFound++;
      cardArray[cardOne].isFound = true;
      cardArray[cardTwo].isFound = true;
    } else {
      cards[cardOne].setAttribute("src", "images/blank.png");
      cards[cardTwo].setAttribute("src", "images/blank.png");
      score -= 2;
      if (score < 0) {
        score = 0;
      }
      showMsg("Sorry, try again");
    }
    cardsChosen = [];
    resultDisplay.textContent = score;
    if (matchFound === cardArray.length / 2) {
      showMsg("Congratulations! You found them all! ");
      let btn = document.createElement("button");
      btn.id = "playAgain";
      btn.innerHTML = "Play Again";
      btn.addEventListener("click", NewBoardGame);
      resultDisplay.append(btn);
      if (score > hightestScore) {
        hightestScore = score;
      }
      topScore.innerHTML = hightestScore;
    }
  }

  //flip your card
  function flipCard() {
    var cardId = this.getAttribute("data-id");
    if (cardsChosen.length < 2 && !cardArray[cardId].isFound) {
      cardsChosen.push(cardId);
      this.setAttribute("src", cardArray[cardId].img);
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function showAgain() {
    if (score > 10) {
      score -= 10;
      var cards = document.querySelectorAll("img");
      cards.forEach((card, i) => {
        if (!cardArray[i].isFound) {
          card.src = cardArray[i].img;
        }
      });
      setTimeout(function () {
        cards.forEach((card, i) => {
          if (!cardArray[i].isFound) {
            card.src = "images/blank.png";
          }
        });
      }, 2000);
    }
  }
  function showMsg(text) {
    msgElement.innerHTML = text;
    msgElement.classList.add("show");
    setTimeout(function () {
      msgElement.classList.remove("show");
    }, 2000);
  }
  NewBoardGame();
  document.querySelector("#BoosterBtn").addEventListener("click", showAgain);
});
