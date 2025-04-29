import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  return (
    <>
      <h1>Welcome !!</h1>

      <input 
        type="text"
        placeholder='Enter your name'
        value={name} 
        onChange={(e)=>setName(e.target.value)}
      />
      <br />
      <br />
      <input 
        type="text"
        placeholder='Enter your mail'
        value={mail} 
        onChange={(e)=>setMail(e.target.value)}
      />
      <div>
        <h3>Preview</h3>
        <p>Name: {name}</p>
        <p>Mail: {mail}</p>
      </div>

    </>
  )
}

export default App
