// WEATHER API
const API_KEY = "4eb3703790b356562054106543b748b2";

const input = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const currentWeatherBox = document.getElementById("current-weather");
const forecastBox = document.getElementById("forecast");
const hourlyBox = document.getElementById("hourly");


// EVENT LISTENERS
searchBtn.addEventListener("click", () => getWeatherByCity(input.value));
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeatherByCity(input.value);
});


// ----------------------------
// AUTO LOCATION ON LOAD
// ----------------------------
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            () => console.warn("Location blocked. User must search manually.")
        );
    }
};


// ----------------------------
// FETCH BY CITY
// ----------------------------
function getWeatherByCity(city) {
    if (!city.trim()) return alert("Enter a valid city name.");

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.cod == "404") return alert("City not found.");
            handleWeatherData(data);
        })
        .catch(() => alert("Weather fetch failed."));
}


// ----------------------------
// FETCH BY COORDS
// ----------------------------
function getWeatherByCoords(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then((res) => res.json())
        .then((data) => handleWeatherData(data))
        .catch(() => alert("Location weather failed."));
}


// ----------------------------
// PROCESS WEATHER DATA
// ----------------------------
function handleWeatherData(data) {
    showCurrentWeather(data);
    getForecast(data.coord.lat, data.coord.lon);
    changeBackground(data.weather[0].main);
}


// ----------------------------
// DISPLAY CURRENT WEATHER
// ----------------------------
function showCurrentWeather(data) {
    currentWeatherBox.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>

        <div class="temp">${Math.round(data.main.temp)}°C</div>

        <div class="meta">${data.weather[0].main}</div>
        <div class="meta">Humidity: ${data.main.humidity}%</div>
        <div class="meta">Wind: ${data.wind.speed} km/h</div>
    `;
}


// ----------------------------
// GET FORECAST
// ----------------------------
function getForecast(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then((res) => res.json())
        .then((data) => {
            showForecast(data.list);
            showHourly(data.list);
        });
}


// ----------------------------
// 5-DAY FORECAST
// ----------------------------
function showForecast(list) {
    forecastBox.innerHTML = "";
    const daily = list.filter((item) => item.dt_txt.includes("12:00:00"));

    daily.forEach((d) => {
        const date = new Date(d.dt_txt)
            .toDateString()
            .split(" ")
            .slice(0, 3)
            .join(" ");

        forecastBox.innerHTML += `
            <div class="forecast-card">
                <h4>${date}</h4>
                <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png" />
                <div class="temp">${Math.round(d.main.temp)}°C</div>
                <div>${d.weather[0].main}</div>
            </div>
        `;
    });
}


// ----------------------------
// HOURLY (NEXT 12 HOURS)
// ----------------------------
function showHourly(list) {
    hourlyBox.innerHTML = "";
    const nextHours = list.slice(0, 6);

    nextHours.forEach((h) => {
        const time = new Date(h.dt_txt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });

        hourlyBox.innerHTML += `
            <div class="hour-card">
                <h4>${time}</h4>
                <img src="https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png" />
                <div class="temp">${Math.round(h.main.temp)}°C</div>
                <div>${h.weather[0].main}</div>
            </div>
        `;
    });
}



// ----------------------------
// AUTO-CONTRAST FUNCTION
// ----------------------------
function autoTextContrast(gradient) {
    const firstColor = gradient.match(/#([0-9a-fA-F]{6})/)[0];

    const r = parseInt(firstColor.substr(1, 2), 16);
    const g = parseInt(firstColor.substr(3, 2), 16);
    const b = parseInt(firstColor.substr(5, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

    const body = document.getElementById("app-body");

    if (luminance > 150) {
        body.classList.add("dark-text");
        body.classList.remove("light-text");
    } else {
        body.classList.add("light-text");
        body.classList.remove("dark-text");
    }
}



// ----------------------------
// BACKGROUND GRADIENT SYSTEM
// ----------------------------
function changeBackground(condition) {
    const gradients = {
        Clear: "linear-gradient(135deg, #ffe259, #ffa751, #ff7b00)",
        Clouds: "linear-gradient(135deg, #a1c4fd, #c2e9fb, #cfd9df)",
        Rain: "linear-gradient(135deg, #283048, #859398)",
        Thunderstorm: "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
        Drizzle: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        Snow: "linear-gradient(135deg, #e0eafc, #cfdef3, #f7f7f7)",
        Mist: "linear-gradient(135deg, #757f9a, #d7dde8)",
        Fog: "linear-gradient(135deg, #757f9a, #d7dde8)",
        Haze: "linear-gradient(135deg, #b3cdd1, #9fa4c4, #6f86d6)"
    };

    const defaultBg =
        "linear-gradient(135deg, #4facfe, #00f2fe, #43e97b)";

    const bg = gradients[condition] || defaultBg;

    document.body.style.background = bg;
    document.body.style.backgroundSize = "400% 400%";

    autoTextContrast(bg);
}
