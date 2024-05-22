import React, { useState } from 'react';
import './weather.css';
import search_icon from "../asset/search.png";
import clear_icon from "../asset/clear.png";
import drizzle_icon from "../asset/drizzle.png";
import snow_icon from "../asset/snow.png";
import wind_icon from "../asset/wind.png";
import rain_icon from "../asset/rain.png";
import humidity_icon from "../asset/humidity.png";
import cloud_icon from "../asset/cloud.png";

const Weather = () => {
    let api_key = "084315800740e2e7c95aff5abcc3926e";
    const [wicon, setwicon] = useState(clear_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value.trim() === "") {
            return; // Empty input, do nothing
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            let data = await response.json();
            let humidity = document.getElementsByClassName("humidity-percent");
            let wind = document.getElementsByClassName("wind-speed");
            let temperature = document.getElementsByClassName("weather-temp");
            let location = document.getElementsByClassName("weather-location");
            humidity[0].innerHTML = data.main.humidity ? data.main.humidity + " %" : 'N/A';
            wind[0].innerHTML = data.wind.speed ? Math.floor(data.wind.speed) + " Km/h" : 'N/A';
            temperature[0].innerHTML = data.main.temp ? Math.floor(data.main.temp) + " °C" : 'N/A';
            location[0].innerHTML = data.name ? data.name : 'N/A';

            // Handle weather icon based on weather condition
            if (data.weather && data.weather.length > 0) {
                const weatherIcon = data.weather[0].icon;
                if (weatherIcon === "01d" || weatherIcon === "01n") {
                    setwicon(clear_icon);
                } else if (weatherIcon.startsWith("02")) {
                    setwicon(cloud_icon);
                } else if (weatherIcon.startsWith("03") || weatherIcon.startsWith("04")) {
                    setwicon(drizzle_icon);
                } else if (weatherIcon.startsWith("09") || weatherIcon.startsWith("10")) {
                    setwicon(rain_icon);
                } else if (weatherIcon.startsWith("13")) {
                    setwicon(snow_icon);
                } else {
                    setwicon(clear_icon);
                }
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Set default values if there's an error
            let humidity = document.getElementsByClassName("humidity-percent");
            let wind = document.getElementsByClassName("wind-speed");
            let temperature = document.getElementsByClassName("weather-temp");
            let location = document.getElementsByClassName("weather-location");
            humidity[0].innerHTML = 'N/A';
            wind[0].innerHTML = 'N/A';
            temperature[0].innerHTML = 'N/A';
            location[0].innerHTML = 'N/A';
            setwicon(clear_icon); // Set default weather icon
        }
    }

    return (
        <div className='container'>
            <header className="top-bar">
                <input type="text" className="cityInput" placeholder='search' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="Search icon" />
                </div>
            </header>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">
                24°C
            </div>
            <div className="weather-location">
                New Delhi
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="Humidity icon" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="Wind icon" className="icon" />
                    <div className="data">
                        <div className="wind-speed">22 KM/H</div>
                        <div className="text">Wind</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;

