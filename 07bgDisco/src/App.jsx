import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState('white');
  // const colors=['red','green','blue','yellow','purple','black','white'];


  return (
    <div className="App" style={{ backgroundColor: bgColor, height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Disco lights</h1>
      <div>
        <button onClick={()=>{setBgColor('red')}} className='bg-red-500 text-black px-4 py-2 rounded' style={{ margin: '10px' }}>Red</button>
        <button onClick={()=>{setBgColor('green')}} className='bg-green-500 text-white px-4 py-2 rounded' style={{ margin: '10px' }}>Green</button>
        <button onClick={()=>{setBgColor('blue')}} className='bg-blue-500 text-white px-4 py-2 rounded' style={{ margin: '10px' }}>Blue</button>
        <button onClick={()=>{setBgColor('yellow')}} className='bg-yellow-400 text-black px-4 py-2 rounded' style={{ margin: '10px' }}>Yellow</button>
        <button onClick={()=>{setBgColor('purple')}} className='bg-purple-500 text-white px-4 py-2 rounded' style={{ margin: '10px' }}>Purple</button>
        <button onClick={()=>{setBgColor('black')}} className='bg-black text-white px-4 py-2 rounded' style={{ margin: '10px' }}>Black</button>
        <button onClick={()=>{setBgColor('white')}} className='bg-white text-yellow-500 border border-yellow-500 px-4 py-2 rounded' style={{ margin: '10px' }}>White</button>
      </div>
    </div>
  )
}

export default App
