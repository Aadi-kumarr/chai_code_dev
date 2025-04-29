import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [likeCount, setLikeCount] = useState(0);

  const [dislikeCount, setDislikeCount]= useState(0);

  const likeInc = () => {
    console.log("like", Math.random());
    // likeCount=likeCount+1;
    setLikeCount(likeCount + 1);
  }

  const dislikeInc = () => {
    console.log("dislike", Math.random());
    // dislikeCount=dislikeCount+1;
    setDislikeCount(dislikeCount + 1);
  }

  return (
    <>
      <h1>Like/Dislike</h1>
      <button
      onClick= {likeInc}
      >Like 👍 :{likeCount}</button>
      <br />
      <br />
      <button
      onClick={dislikeInc}
      >Dislike 👎 :{dislikeCount}</button>
    </>
  )
}

export default App
