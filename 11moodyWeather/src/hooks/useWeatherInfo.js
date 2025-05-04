import { useEffect, useState, useCallback, useRef } from 'react';

const API_KEY = 'b53b739160d1c60f295c7f1bc354fd20';

const moodCityMap = {
  happy: ["Barcelona", "Rio de Janeiro", "Sydney"],
  sad: ["London", "Seattle", "Dublin"],
  calm: ["Kyoto", "Zurich", "Oslo"],
  angry: ["Delhi", "Phoenix", "Cairo"],
  cool: ["Reykjavik", "Vancouver", "Helsinki"],
  loving: ["Paris", "Venice", "Prague"],
};

const useWeatherInfo = (mood) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UseRef to persist the selected city across re-renders
  const selectedCityRef = useRef(null);

  // Fetch weather function (memoized)
  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }

      setWeatherData({
        city,
        ...data
      });

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    } 
  }, []);

  useEffect(() => {
    if (!mood || !moodCityMap[mood]) return;

    // Select a random city once and store it
    if (!selectedCityRef.current) {
      const cities = moodCityMap[mood];
      selectedCityRef.current = cities[Math.floor(Math.random() * cities.length)];
    }

    fetchWeather(selectedCityRef.current);

    // Reset selected city when mood changes
    return () => {
      selectedCityRef.current = null;
    };

  }, [mood, fetchWeather]);

  return { weatherData, loading, error };
};

export default useWeatherInfo;
