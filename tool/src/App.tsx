import React, { useState } from 'react'
import './App.css'

type Point = {
  x: number;
  y: number;
}

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [popped, setPopped] = useState<Point[]>([]);

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>){
    const { clientX, clientY} = e;
    setPoints([...points, 
    {
      x: clientX,
      y: clientY,
    },
  ]);
  }

  function handleUndo() {
    // remove last point added
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  }

  function handleRedo() {
    // a point from Popped array is transferred to Points array
    // new popped array
    const newPopped = [...popped];
    // new points array
    const newPoints = [...points];
    // pop from new popped array
    const poppedPoint = newPopped.pop()
    if (!poppedPoint) return
    // add popped to new points array
    newPoints.push(poppedPoint);
    setPoints(newPoints);
    setPopped(newPopped);
  }

  return (
    <>
    <button disabled={points.length === 0} onClick={handleUndo}>Undo</button>
    <button disabled={popped.length === 0} onClick={handleRedo}>Redo</button>
    <div className="App" onClick={handlePlaceCircle}>
      {points.map((point, idx)=> (
        <div 
        key={idx}
        className="point" 
        style={{
          left: point.x - 8 + "px",
          top: point.y - 10 + "px",
        }}>

        </div>
      ))}
    </div>
    </>
  )
}

export default App
