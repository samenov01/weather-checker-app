'use client';

import { useState } from 'react';
import { googleIconsMap } from './src/utils/weatherMapping';
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
    <main className='main font-inter'>
      <p style={{fontSize: '3rem',fontWeight: '900', paddingBottom: '20px'}}>Посмотреть погоду</p>
      
      <form onSubmit={fetchWeather} className='weather-form'>
        <div className="input-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите город"
          />
          <button 
          type="submit" 
          disabled={loading}
          className={'button-center'}
          >
          {loading ? 
            <div className='svg-icons'>
              <img src="https://seekicon.com/free-icon-download/loading-3-quarters_1.svg" alt="loading" className='loading-icon svg-icons'/>
            </div>
          :
            <div className='svg-icons'>
              <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
            </div>
          }
          
          </button>
        </div>
      </form>

      {weatherData && (console.log(weatherData))}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className='information'>
          <div className='weather-data'>
            <div className='weather-icon'>
              {weatherData.weather[0].icon && (
                <img 
                  src={`${googleIconsMap[weatherData.weather[0].icon as keyof typeof googleIconsMap]}`} 
                  alt="Weather icon" 
                  width='60px'
                />
              )}
            </div>
            <div className='weather-temp'>
              <span className='weather-temp-value'>{Math.round(weatherData.main.temp)}</span>
              <span className='weather-temp-unit'>°C</span>
            </div>
            <div className='weather-info'>
              <p className='info-p'>Влажность: {weatherData.main.humidity}%</p>
              <p className='info-p'>Ветер: {weatherData.wind.speed} м/с</p>
              <p className='info-p'>Состояние: {weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className='other-info'>
              <span className='about'>
                <div className='about-text-main'>{weatherData.name}</div>
                <div className='about-text-small'>{weatherData.sys.country}</div>
                <div className='about-text-small'>{new Date().toLocaleTimeString()}</div>
              </span>
          </div>
        </div>
      )}
    </main>
  );
}
