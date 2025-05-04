import React, { useState } from 'react';
import './App.css';
import useWeatherInfo from './hooks/useWeatherInfo'; // Custom hook

const App = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const { weatherData, loading, error } = useWeatherInfo(selectedMood); // Using custom hook

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-6">
      {/* Header */}
      <header className="text-3xl md:text-5xl font-bold text-white mb-10 tracking-wide">
        Mood-Based Weather App 🌌
      </header>

      {/* Mood Selector Section */}
      <section className="bg-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-md mb-12">
        <h2 className="text-xl font-semibold text-white mb-4">
          What's your mood today?
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <button 
            className="bg-gradient-to-br from-yellow-500 to-yellow-300 hover:scale-105 transition rounded-xl p-4 text-xl"
            onClick={() => setSelectedMood('happy')}
          >😊</button>
          <button 
            className="bg-gradient-to-br from-blue-500 to-blue-300 hover:scale-105 transition rounded-xl p-4 text-xl"
            onClick={() => setSelectedMood('sad')}
          >😔</button>
          <button 
            className="bg-gradient-to-br from-purple-500 to-purple-300 hover:scale-105 transition rounded-xl p-4 text-xl"
            onClick={() => setSelectedMood('calm')}
          >😌</button>
          <button 
            className="bg-gradient-to-br from-red-500 to-red-300 hover:scale-105 transition rounded-xl p-4 text-xl"
            onClick={() => setSelectedMood('angry')}
          >😠</button>
          <button 
            className="bg-gradient-to-br from-green-500 to-green-300 hover:scale-105 transition rounded-xl p-4 text-xl"
            onClick={() => setSelectedMood('cool')}
          >😎</button>
          <button 
            className="bg-gradient-to-br from-pink-500 to-pink-300 hover:scale-105 transition rounded-xl p-4 text-xl"
            onClick={() => setSelectedMood('loving')}
          >🥰</button>
        </div>
      </section>

      {/* Results Section */}
      {selectedMood && (
        <section className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Matching City Based on Your Mood
          </h3>

          {loading && <div className="text-gray-400">Fetching weather data...</div>}

          {error && <div className="text-red-500">Error: {error}</div>}

          {weatherData && (
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl">🌦️</div>
              <div className="text-xl font-medium text-gray-200">
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div className="text-sm text-gray-400">
                Current Weather: {weatherData.weather[0].description}
              </div>
              <div className="text-sm text-gray-400">
                Temperature: {weatherData.main.temp}°C
              </div>
            </div>
          )}

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
            onClick={() => setSelectedMood(null)}
          >
            Try Again
          </button>
        </section>
      )}
    </div>
  );
};

export default App;
