import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


type TCell = {
  row: number,
  col: number;
}

function App() {
  const [grid, setGrid] = useState([
    [4, 5, 3, 1],
    [1, 2, 4, 5],
    [0, 3, 0, 2],
  ]);

  const [revealed, setRevealed] = useState(
    new Array(grid.length)
    .fill("")
    .map(() => new Array(grid[0].length)
    .fill(false))
  );

  const [prevClick, setPrevClick] = useState<TCell | undefined>();

  function handleCardClicked(rowIndex: number, colIndex: number) {
    if (revealed[rowIndex][colIndex]) return;
    const clickedNumber = grid[rowIndex][colIndex]
    const newRevealed = [...revealed]
    newRevealed[rowIndex][colIndex] = true;
    setRevealed(newRevealed)

    if (prevClick) {
      const prevClickedNumber = grid[prevClick.row][prevClick.col]
      if (prevClickedNumber !== clickedNumber) {
        setTimeout(() => {
          newRevealed[rowIndex][colIndex] = false;
          newRevealed[prevClick.row][prevClick.col] = false;
          setRevealed([...newRevealed])
        }, 1000)

      } else {
        const hasWon = revealed.flat().every((revealed) => revealed)
        if (hasWon) {
          setTimeout(() => {
            alert("you won");
          })
        }

      }
      setPrevClick(undefined)
    } else {
      setPrevClick({
        row: rowIndex,
        col: colIndex
      });
    }
  }

  return (
    <div className="App">
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div 
              onClick={() => handleCardClicked(rowIndex, colIndex)}
              key={colIndex} 
              className={"card " + (revealed[rowIndex][colIndex] ? "revealed" : "")}>
                {revealed[rowIndex][colIndex] ? number : ""}
              </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
