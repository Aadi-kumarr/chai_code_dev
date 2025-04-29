import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const sample=["Apple","Banana","Cherry","Mango"];

  const [fruits, setFruits] = useState(sample);
  const [input, setInput] = useState("");

  let addtask = () => {
    console.log("add task", Math.random());
    // fruits.push("Orange");
    // fruits = [...fruits, "Orange"];
    // fruits = ["Apple", "Banana", "Cherry", "Mango", "Orange"];
    if (input.trim() !== "") {
      setFruits([...fruits, input.trim()]);
      setInput(""); // Clear the input field
    }
  }
  return (
    <>
      <h1>Welcom to you To-Do list.</h1>
      <input 
      type="text"
      placeholder='Enter a task'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addtask}>Add Task</button>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      
    </>
  )
}

export default App
