import React, { useState } from 'react'
import { fetchWeather } from './api/fetchWeather'
import './App.css'

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = async(e)=>{
   try {
    if(e.key === 'Enter'){
      const data = await fetchWeather(query.toLocaleLowerCase());
      console.log(data);
      setWeather(data);
      setQuery('');
    }
   } catch (error) {
    if(error){
      alert("Enter the serch data corectly")
    }
    console.log(error)
   }
  }
 
  return (
    <div className='main-container'>
      <input type="text" name="" className='search' placeholder='Search....' value={query} onChange={(e)=> setQuery(e.target.value)} onKeyUp={search} />
       {weather.main && (
         <div className="city">
           <h2 className='city-name'>
            <span>{weather.name}</span>
            <span>{weather.sys.country}</span>
           </h2>
           <div className="city-temp">
            { Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
           </div>
           <div className="info">
           <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
           <p>{weather.weather[0].description}</p>
           </div>
         </div>
       )}
    </div>
  )
}

export default App
