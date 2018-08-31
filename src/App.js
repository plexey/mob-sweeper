import React, { Component } from "react"
import { observer } from "mobx-react"
import boardStore from "./state/BoardStore"
import styled from "styled-components"
import Tile from "./components/Tile"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Row = styled.div`
  display: flex;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
`

const Edge = styled.div`
  border-style: solid;
  border-width: 4px;
  border-color: hsl(0, 0%, 50%) hsl(0, 0%, 95%) hsl(0, 0%, 95%) hsl(0, 0%, 50%);
`

const Frame = styled.div`
  background: hsl(0, 0%, 80%);
  padding: 10px;
  border-style: solid;
  border-width: 4px;
  border-color: hsl(0, 0%, 95%) hsl(0, 0%, 50%) hsl(0, 0%, 50%) hsl(0, 0%, 95%);
`

@observer
class App extends Component {
  componentDidMount() {
    boardStore.createBoard()
  }
  render() {
    const boardContent = boardStore.rows.map((row, index) => (
      <Row key={index}>
        {row.map(tile => (
          <Tile
            clickAction={tile.reveal}
            revealed={tile.revealed}
            mined={tile.mined}
            gameStatus={boardStore.gameStatus}
            adjacentMines={tile.adjacentMines}
            key={`${tile.x}, ${tile.y}`}
          />
        ))}
      </Row>
    ))
    return (
      <Container>
        <h1>Mobsweeper</h1>
        <h4>Minesweeper built with Mobx</h4>
        <Frame>
          <Edge>{boardContent}</Edge>
        </Frame>
        {boardStore.gameStatus === "success" && <h2>You did not die :D</h2>}
        {boardStore.gameStatus === "fail" && <h2>Rest in pieces</h2>}
        <button onClick={() => boardStore.createBoard()}>Reset</button>
        <Controls>
          <h3>Controls</h3>
          <label>Rows</label>
          <input
            type="number"
            value={boardStore.rowCount}
            onChange={event => boardStore.changeRowCount(event.target.value)}
          />
          <label>Columns</label>
          <input
            type="number"
            value={boardStore.columnCount}
            onChange={event => boardStore.changeColumnCount(event.target.value)}
          />
          <label>Mines</label>
          <input
            type="number"
            value={boardStore.mineCount}
            onChange={event => boardStore.changeMineCount(event.target.value)}
          />
        </Controls>
      </Container>
    )
  }
}

export default App
