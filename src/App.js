import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [location, SetLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=46dbbc7a469fa79e2536460e779d085d`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    SetLocation('')
  }
  }



  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event=> SetLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
          {data.main ? <p>{data.main.temp.toFixed()}</p> : null}
           
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

        </div>
        {data.name !== undefined &&
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>humidity</p>
          </div>
          <div className='wind'>
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind speed</p>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
