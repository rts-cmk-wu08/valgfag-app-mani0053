import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import OneSignal from "react-onesignal";
import PWAPrompt from "react-ios-pwa-prompt";

function App() {
  // OneSignal
  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONESIGNAL,
    });
  }, []);

  // Weather
  const [data, setData] = useState({});
  const [location, SetLocation] = useState("");

  //Date
  const today = new Date();
  const f = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  });
  console.log(f.format(today));

  //Fetch openweathermap
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      SetLocation("");
    }
  };

  return (
    <>
      <div className="app">
        {/* HEADER */}
        <header>
          <h1>This is your daily weather app</h1>
          <p>Type a location in the searchbar</p>
        </header>
        {/* MAIN */}
        <main>
          {/* SEARCH */}
          <div className="search">
            <input
              value={location}
              onChange={(event) => SetLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
          </div>
          {/* DISPLAY TOP */}
          <div className="container">
            {data.name !== undefined && (
              <div>
                <p className="today">{f.format(today)}</p>
                <div className="top">
                  <div className="location">
                    <p>{data.name}</p>
                  </div>
                  <div className="temp">
                    {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
                  </div>
                  <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null}
                  </div>
                </div>
              </div>
            )}

            {/* DISPLAY BOTTOM */}
            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  ) : null}
                  <p>Feels like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()}MPS</p>
                  ) : null}
                  <p>Wind speed</p>
                </div>
              </div>
            )}
          </div>
        </main>
        {/* FOOTER */}
        <footer>PWA project - Weather app - WU08 22/23</footer>
      </div>
      <PWAPrompt />
    </>
  );
}

export default App;
