import { useState } from 'react';
import './App.css'

function App() {

  const files = {
    children: [
      {
        name: 'node_modules',
        children: [
          {
            name: 'joi',
            children: [
              {
                name: 'aaabbb',
                children: [
                  {
                    name: 'bakabaka',
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'package.json',
      },
      {
        name: 'vite.congif.ts',
      }
    ]
  }

  type TEntry = {
    name: string;
    children?: TEntry[];
  }


  function Entry({ entry, depth }: {entry: TEntry; depth: number}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return <div>
      {entry.children ? (
        <button 
        className="entry" 
        onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "-" : "+"}
        {entry.name}
      </button>
      ) : <div>{entry.name}</div>}
      {isExpanded && (
        <div style={{paddingLeft: `${depth * 10}px`}}>
          {entry.children?.map((entry, entryIndex) => (
            <Entry entry={entry} depth={depth + 1} key={entryIndex}/>
            ))}
        </div>
      )}
      </div>
  }

  return (
    <div className="App">
      {files.children.map((entry, entryIndex) => (
        <Entry entry={entry} depth={1} key={entryIndex}/>
      ))}
    </div>
  )
}

export default App
