"use client";

import { useState } from 'react';
import './mainPage.css'

export default function WeatherSearch() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error('Произошла ошибка');
      }

      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='main'>
      <h1>Weather Checker App</h1>
      
      <form onSubmit={fetchWeather} className='weather-form'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите город"
        />
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Ищем...' : 'Искать'}
        </button>
      </form>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className='weather-data'>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Температура:</strong> {Math.round(weatherData.main.temp)}°C</p>
          <p><strong>Ощущается как:</strong> {Math.round(weatherData.main.feels_like)}°C</p>
          <p><strong>Состояние:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Влажность:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Ветер:</strong> {weatherData.wind.speed} м/с</p>
        </div>
      )}
    </main>
  );
}