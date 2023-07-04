import React, { useState } from 'react';

const api = {
  key: "4f8e795dcd6dbf7b9f5276bff095ffc1",
  base: "https://api.openweathermap.org/data/2.5/"
};

const popularCities = [
  "London",
  "New York",
  "Paris",
  "Tokyo",
  "Sydney",
  "Dubai",
  "Moscow",
  "Rio de Janeiro",
];

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const search = () => {
    setShowDropdown(false);
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
  };

  const handleDropdownClick = (city) => {
    setQuery(city);
    setShowDropdown(false);
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleSearchBarFocus = () => {
    setShowDropdown(true);
  };

  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <div className="search-bar-container">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onFocus={handleSearchBarFocus}
            />
            <button className="search-button" onClick={search}>
              Search
            </button>
            <button className="search-button" onClick={search}>
              Weekly
            </button>
            <button className="search-button" onClick={search}>
              Monthly
            </button>
          </div>
          {showDropdown && (
            <div className="dropdown">
              {popularCities.map((city, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleDropdownClick(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
                <br></br>
                {Math.round(weather.main.temp*(9/5)+32)}°F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
