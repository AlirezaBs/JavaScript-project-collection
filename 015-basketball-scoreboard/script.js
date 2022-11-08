const homeScoreboard = document.querySelector(".home-score")
const guestScoreboard = document.querySelector(".guest-score")

let HOME_SCORE = 0
let GUEST_SCORE = 0

document.addEventListener("click", function (e) {
   const target = e.target

   if (e.target.dataset.homePoints) {
      HOME_SCORE += +target.dataset.homePoints
      homeScoreboard.textContent = HOME_SCORE
   } else if (e.target.dataset.guestPoints) {
      GUEST_SCORE += +target.dataset.guestPoints
      guestScoreboard.textContent = GUEST_SCORE
   } else if (target.dataset.newGame) {
      HOME_SCORE = 0
      GUEST_SCORE = 0
      homeScoreboard.textContent = HOME_SCORE
      guestScoreboard.textContent = GUEST_SCORE
   }
})
