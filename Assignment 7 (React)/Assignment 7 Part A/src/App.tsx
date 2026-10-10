import { useState } from 'react';
import './App.css';

function App() {
  // Counter state using useState
  const [count, setCount] = useState(0);

  // Input state using useState
  const [text, setText] = useState('');

  return (
    <div className="container">
      <h1>React Counter & Input</h1>

      {/* Counter Section */}
      <div className="box">
        <h2>Counter</h2>
        <div className="counter-num">{count}</div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* Input and Output Section */}
      <div className="box">
        <h2>Data Input</h2>
        <input
          type="text"
          placeholder="Enter some text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="output-text">Output: {text}</p>
      </div>
    </div>
  );
}

export default App;
