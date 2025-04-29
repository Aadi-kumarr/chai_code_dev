import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

let [counter, setCounter]=useState(7);
const addValue=()=>{
  console.log("add value",Math.random());
  // counter=counter+1;
  setCounter(counter+1);
}

const DecValue=()=>{
  console.log("decrease value",Math.random());
  // counter=counter-1;
  setCounter(counter-1);
}
//  let counter=7;
  return (
    <>
      <h1>hello world</h1>
      <h3>Counter value:{counter}</h3>

      <button
      onClick={addValue}
      >Increase value</button>
      <br />
      <br />
      <button
      onClick={DecValue}>Decrease value</button>
    </>
  )
}

export default App
