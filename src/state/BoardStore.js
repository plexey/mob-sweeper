import { when, computed, action, observable } from "mobx"
import Tile from "./TileStore"

class BoardStore {
  @observable rowCount = 10
  @observable columnCount = 10
  @observable mineCount = 10
  @observable rows = []
  @observable gameStatus = "not started"

  @action.bound
  changeRowCount(val) {
    this.rowCount = val
    this.createBoard()
  }

  @action.bound
  changeColumnCount(val) {
    this.columnCount = val
    this.createBoard()
  }

  @action.bound
  changeMineCount(val) {
    this.mineCount = val
    this.createBoard()
  }

  @action.bound
  win() {
    this.gameStatus = "success"
    this.revealMines()
  }

  @action.bound
  lose() {
    this.gameStatus = "fail"
  }

  @action.bound
  revealMines() {
    this.tiles.forEach(tile => {
      if (tile.mined === true) {
        tile.revealed = true
      }
    })
  }

  @computed
  get tiles() {
    return [].concat(...this.rows)
  }

  @computed
  get sweepComplete() {
    return this.tiles.every(tile => tile.revealed || tile.mined)
  }

  @computed
  get exploded() {
    return this.tiles.some(tile => tile.revealed && tile.mined)
  }

  @action.bound
  layMines = () => {
    const tempArr = [...this.tiles]
    for (let i = 0; i < this.mineCount; i++) {
      if (tempArr.length <= 0) {
        console.warn("No more places to place the mines")
        return
      }
      const min = 0
      const max = tempArr.length - 1
      const minePosition = Math.floor(Math.random() * (max - min + 1) + min)
      tempArr[minePosition].mined = true
      tempArr.splice(minePosition, 1)
    }
  }

  @action.bound
  createBoard = () => {
    this.rows.clear()

    for (let i = 0; i < this.rowCount; i++) {
      const row = observable([])
      for (let j = 0; j < this.columnCount; j++) {
        row.push(new Tile({ x: j, y: i, board: this }))
      }
      this.rows.push(row)
    }
    this.layMines()
    this.gameStatus = "playing"
    when(
      () =>
        this.gameStatus === "playing" && !this.exploded && this.sweepComplete,
      () => this.win()
    )
    when(() => this.gameStatus === "playing" && this.exploded, this.lose)
  }

  getTile = ({ x, y }) => {
    // check if coordinates out of bounds
    if (
      x < 0 ||
      y < 0 ||
      x > this.rows[0].length - 1 ||
      y > this.rows.length - 1
    ) {
      return
    }
    return (this.rows[y] || [])[x]
  }

  getAdjacentTiles = tile => {
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i].length; j++) {
        if (this.getTile({ x: j, y: i }) === tile) {
          return [
            this.getTile({ x: j - 1, y: i - 1 }),
            this.getTile({ x: j - 1, y: i }),
            this.getTile({ x: j - 1, y: i + 1 }),
            this.getTile({ x: j, y: i - 1 }),
            this.getTile({ x: j, y: i + 1 }),
            this.getTile({ x: j + 1, y: i - 1 }),
            this.getTile({ x: j + 1, y: i }),
            this.getTile({ x: j + 1, y: i + 1 })
          ].filter(Boolean)
        }
      }
    }
    throw new Error("Tile not found on board")
  }
}

export default new BoardStore()
