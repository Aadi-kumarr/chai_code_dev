import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [bgColor,setBgColor]=useState(false);

  const changeColor=()=>{
    console.log("change color",Math.random());
    // bgColor=!bgColor;
    
    setBgColor(!bgColor);
    if(bgColor){
      document.body.style.backgroundColor="white";
      document.body.style.color = "black";
    }

    else{
      document.body.style.backgroundColor="black";
      document.body.style.color = "white";
    }
  }
  return (
    <>
      <h1>Hello World</h1>
      <button
      onClick={changeColor}
      >Change Theme</button>
    </>
  )
}

export default App
