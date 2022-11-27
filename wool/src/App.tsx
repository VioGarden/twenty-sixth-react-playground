import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState<string>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectionResult, setSelectionResult] = useState<Result | undefined>(undefined);
  const [previousAnswer, setPreviousAnswer] = useState<string>("");

  const getRandomColor = () => {
    const digits = ['0', '1', '2', '3', '4', 
      '5', '6', '7', '8', '9',
      'A', 'B', 'C', 'D', 'E', 'F']

    const color = new Array(6)
      .fill('')
      .map(() => digits[Math.floor(Math.random() * digits.length)])
      .join("");
    return `#${color}`
  }

  enum Result {
    Correct,
    Wrong,
  }
  
  const pickColor = () => {
    const actualColor = getRandomColor()
    setColor(actualColor);
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(
      () => 0.5 - Math.random()))
  };

  useEffect(() => {
    pickColor()
  }, []);

  const handleAnswerClicked = (answer: string) => {
    if (answer === color) {
      setSelectionResult(Result.Correct);
      setPreviousAnswer(color)
      pickColor()
    } else {
      setSelectionResult(Result.Wrong);
    }
  }

  return (
    <div className="App">
      <div className='col'>
        <div className="guess"
          style={{background: color}}>
        </div>
          {answers.map((answer) => (
            <button 
              onClick={() => handleAnswerClicked(answer)}
              key={answer}>
              {answer}
            </button>
          ))}
          {selectionResult === Result.Wrong && <div className='wrong'>Wrong Answer</div>}
          {selectionResult === Result.Correct && <div className='correct'>Correct!</div>}
        <div className="prev-answer">
          <div className="prev-color">
            {previousAnswer}
          </div>
          <div className="prev-text">
            {previousAnswer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
