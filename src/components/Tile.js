import React from "react"
import styled from "styled-components"

const textColor = {
  1: "blue",
  2: "green",
  3: "red",
  4: "darkblue",
  5: "darkred",
  6: "darkcyan",
  7: "darkviolet",
  8: "darkgray"
}

const tileColor = (revealed, mined, gameStatus) => {
  if (revealed) {
    if (mined) {
      if (gameStatus === "success") {
        return "hsl(130, 80%, 70%)"
      }
      if (gameStatus === "fail") {
        return "hsl(0, 80%, 70%)"
      }
    }
    return "hsl(0, 0%, 85%)"
  }
  return "hsl(0, 0%, 80%)"
}

const TileStyle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
  border-style: solid;
  border-width: 4px;
  border-color: ${({ revealed }) =>
    revealed
      ? "hsl(0, 0%, 70%)"
      : "hsl(0, 0%, 95%) hsl(0, 0%, 50%) hsl(0, 0%, 50%) hsl(0, 0%, 95%)"};
  color: ${({ adjacentMines }) => textColor[adjacentMines]};
  color: ${({ mined }) => mined && "black"};
  background: ${({ revealed, mined, gameStatus }) =>
    tileColor(revealed, mined, gameStatus)};
  transition: 100ms ease all;
`

const Tile = ({ clickAction, revealed, mined, gameStatus, adjacentMines }) => {
  return (
    <TileStyle
      onClick={clickAction}
      revealed={revealed}
      mined={mined}
      gameStatus={gameStatus}
      adjacentMines={adjacentMines}
    >
      {revealed ? (mined ? "]v[" : adjacentMines > 0 && adjacentMines) : ""}
    </TileStyle>
  )
}

export default Tile
