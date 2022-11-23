import React, { useState } from 'react'
import './App.css'
import { useGetSynonyms } from './hooks/useHooks';

function App() {
  const [word, setWord] = useState<string>("");
  const {isLoading, synonyms, getSynonyms} = useGetSynonyms();

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    getSynonyms(word); 
  }

  const handleSynClick = (next: string) => {
    setWord(next);
    getSynonyms(word);
  }


  return (
    <div className="App">
      <form 
      method="POST"
      action="/url"
      onSubmit={handleFetchSynonyms}
      >
        <label htmlFor="word-input">Your Word</label>
        <input 
        value={word}
        onChange={(e) => setWord(e.target.value)}
        id="word-input" type="text" />
        <button>Submit</button>
      </form>
    {isLoading ? <div>Loading...</div> :
    <ul>
    {synonyms.map(synonym => 
    <li 
    onClick={() => handleSynClick(synonym.word)}
    key={synonym.word}>{synonym.word} {synonym.score}
    </li>)}
    </ul>}
    </div>
  )
}

export default App
