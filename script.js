"use strict"

// Selecting Elements
const elementPlayer0 = document.querySelector(".player--0")
const elementPlayer1 = document.querySelector(".player--1")

const elementScore0 = document.querySelector("#score--0")
const elementScore1 = document.querySelector("#score--1")

const elementCurrent0 = document.querySelector("#current--0")
const elementCurrent1 = document.querySelector("#current--1")

const elementDice = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnHold = document.querySelector(".btn--hold")
const btnRoll = document.querySelector(".btn--roll")

let scores, currentScore, activePlayer, playing;

const switchPlayer = function() {

  currentScore = 0
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore

    activePlayer = (activePlayer === 0) ? 1 : 0

    elementPlayer0.classList.toggle("player--active")
    elementPlayer1.classList.toggle("player--active")

}

// Setting initial scores to 0 and hiding the dice
const init = function() {

  playing = true

  scores = [0, 0]
  currentScore = 0
  activePlayer = 0


  elementScore0.textContent = 0
  elementScore1.textContent = 0
  elementCurrent0.textContent = 0
  elementCurrent1.textContent = 0


  elementDice.classList.add("hidden")

  elementPlayer0.classList.remove("player--winner")
  elementPlayer1.classList.remove("player--winner")

  elementPlayer0.classList.add("player--active")
  elementPlayer1.classList.remove("player--active")
}
init()

btnRoll.addEventListener("click", function() {
  
  if(playing) {
    // Getting a random dice roll and displaying it
    let diceRoll = Math.floor(Math.random() * 6) + 1

    // Displaying the rolled dice
    elementDice.classList.remove("hidden")
    elementDice.src = `dices/dice-${diceRoll}.png`

    // Check if dice is 1
    if(diceRoll !== 1) {

      currentScore += diceRoll
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore
    }
    else { // Reset score if dice is 1 and change players

      switchPlayer()
    }
  }
})

btnHold.addEventListener("click", function() {

  if(playing) {
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    if(scores[activePlayer] >= 100) {
      //Finish the game
      playing = false
      elementDice.classList.add("hidden")

      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")

      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
    }
    else {

    }

    switchPlayer()
  }
})

// Reset the game

btnNew.addEventListener("click", init)