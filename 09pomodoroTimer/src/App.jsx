import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function App() {
  const [sessionCount, setSessionCount] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);

  const timeRef = useRef(null);
  // Timer start/pause effect
  useEffect(() => {
    if (isRunning) {
      timeRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timeRef.current);
            switchPhase();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timeRef.current);
    }

    return () => clearInterval(timeRef.current);
  }, [isRunning]);

  // Reset everything on resetFlag
  useEffect(() => {
    if (resetFlag) {
      setSessionCount(0);
      setIsBreak(false);
      setSessionLength(25);
      setBreakLength(5);
      setTimeRemaining(25 * 60);
      setIsRunning(false);
      setResetFlag(false);
    }
  }, [resetFlag]);

  // Sync time when session length changes (before start)
  useEffect(() => {
    if (!isRunning && !isBreak) {
      setTimeRemaining(sessionLength * 60);
    }
  }, [sessionLength, isBreak, isRunning]);

  // Sync time when break length changes (before break starts)
  useEffect(() => {
    if (!isRunning && isBreak) {
      setTimeRemaining(breakLength * 60);
    }
  }, [breakLength, isBreak, isRunning]);

  const switchPhase = useCallback(() => {
    if (isBreak) {
      setSessionCount(prev => prev + 1);
      setTimeRemaining(sessionLength * 60);
      setIsBreak(false);
    } else {
      setIsBreak(true);
      setTimeRemaining(breakLength * 60);
    }
    setIsRunning(false);
  }, [breakLength, sessionLength]);

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setResetFlag(true);
  };

  const formatTime = useCallback((timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-pink-100 to-yellow-100 p-6 font-sans">
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/40">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">Pomodoro Timer</h1>
          <p className="text-lg text-gray-600 mt-2">Stay focused. Take breaks. Boost productivity.</p>
          <h2 className="text-2xl font-medium text-gray-900 mt-6">Session: <span className='font-bold'>{sessionCount}</span></h2>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-6 mb-10">
          <button 
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-2 rounded-full shadow-md transition-all duration-200"
            onClick={handleStartPause}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white text-lg px-6 py-2 rounded-full shadow-md transition-all duration-200"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-10">
          <h2 className="text-6xl font-extrabold text-gray-800">{formatTime(timeRemaining)}</h2>
          <p className="text-xl text-gray-600 mt-2">{isBreak ? 'Break' : 'Session'}</p>
        </div>

        {/* Break and Session Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Break Length */}
          <div className="bg-white/50 p-6 rounded-2xl shadow-inner flex flex-col items-center border border-white/30">
            <p className="text-xl font-semibold text-purple-700 mb-3">Break Length</p>
            <div className="flex items-center gap-6">
              <button 
                className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-2xl px-5 py-2 rounded-full shadow-lg hover:scale-110 hover:shadow-purple-400 transition-transform duration-200"
                onClick={() => { if (breakLength < 60) setBreakLength(breakLength + 1); }}
              >+</button>
              <h2 className="text-3xl font-bold text-gray-800">{breakLength}</h2>
              <button 
                className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-2xl px-5 py-2 rounded-full shadow-lg hover:scale-110 hover:shadow-purple-400 transition-transform duration-200"
                onClick={() => { if (breakLength > 1) setBreakLength(breakLength - 1); }}
              >-</button>
            </div>
          </div>

          {/* Session Length */}
          <div className="bg-white/50 p-6 rounded-2xl shadow-inner flex flex-col items-center border border-white/30">
            <p className="text-xl font-semibold text-pink-700 mb-3">Session Length</p>
            <div className="flex items-center gap-6">
              <button 
                className="bg-gradient-to-br from-pink-400 to-pink-600 text-white text-2xl px-5 py-2 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-400 transition-transform duration-200"
                onClick={() => { if (sessionLength < 60) setSessionLength(sessionLength + 1); }}
              >+</button>
              <h2 className="text-3xl font-bold text-gray-800">{sessionLength}</h2>
              <button 
                className="bg-gradient-to-br from-pink-400 to-pink-600 text-white text-2xl px-5 py-2 rounded-full shadow-lg hover:scale-110 hover:shadow-pink-400 transition-transform duration-200"
                onClick={() => { if (sessionLength > 1) setSessionLength(sessionLength - 1); }}
              >-</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;
