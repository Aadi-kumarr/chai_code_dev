import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbersAllowed) {
      characters += '0123456789';
    }
    if (charactersAllowed) {
      characters += '!@#$%^&*()_+[]{}|;:,.<>?';
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
    setCopied(false);
  }, [length, charactersAllowed, numbersAllowed]);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  };

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-lg rounded-lg bg-white p-6 text-gray-700">
        <h1 className="text-2xl font-bold text-center mb-4 text-orange-500">🔐 Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-2 px-3 text-lg"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <label>Password Length: {length}</label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label>Include Special Characters</label>
            <input
              type="checkbox"
              checked={charactersAllowed}
              onChange={() => setCharactersAllowed((prev) => !prev)}
            />
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
