import {
  revealTile,
  createBoard,
  markTiles,
  TILES_STATUS,
  checkLose,
  checkWin,
} from "./minsweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 8

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const mineCounteText = document.querySelector("[data-mine-counte]")
const messageText = document.querySelector(".subtext")

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener("click", (e) => {
      revealTile(board, tile)
      checkGameEnd()
    })
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTiles(tile)
      listMinesLeft()
    })
  })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
mineCounteText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILES_STATUS.MARKED).length
    )
  }, 0)

  mineCounteText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true })
    boardElement.addEventListener("contextmenu", stopProp, { capture: true })
  }

  if (win) {
    messageText.textContent = "You  Win"
  }

  if (lose) {
    messageText.textContent = "You Lose"
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILES_STATUS.MARKED && tile.mine) markTiles(tile)

        if (tile.mine) revealTile(board, tile)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

// 1. Populate a board with tiles/mines  ✔️
// 2. Left Click on tiles   ✔️
//    a. Reveal tiles   ✔️
// 3. Right click on tiles   ✔️
//    a. Mark tiles   ✔️
// Check for win/lose
