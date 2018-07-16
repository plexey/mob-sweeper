import { observable, computed, action, when } from "mobx"

export default class Tile {
  constructor({ x, y, board }) {
    this.x = x
    this.y = y
    this.board = board
    this.disposeRevealer = when(
      () =>
        this.revealed === true &&
        this.mined === false &&
        this.adjacentMines === 0,
      () => this.revealAdjacent()
    )
  }

  dispose() {
    this.disposeRevealer()
  }

  @observable x
  @observable y
  @observable mined = false
  @observable flagged = false
  @observable revealed = false
  @observable adjacent

  @computed
  get adjacentTiles() {
    return this.board.getAdjacentTiles(this)
  }

  @computed
  get adjacentUnrevealedTiles() {
    return this.adjacentTiles.filter(tile => tile.revealed === false)
  }

  @computed
  get adjacentMines() {
    return this.adjacentTiles.filter(tile => tile.mined === true).length
  }

  @action.bound
  reveal() {
    this.revealed = true
  }

  @action.bound
  revealAdjacent() {
    const safeTiles = this.adjacentUnrevealedTiles.filter(
      tile => tile.mined === false
    )
    safeTiles.forEach(tile => tile.reveal())
  }
}
