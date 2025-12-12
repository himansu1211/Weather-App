# 🌦️ WeatherSphere --- Advanced Global Weather Application

WeatherSphere is a modern, high-performance weather dashboard built
using **HTML**, **CSS**, and **JavaScript**, powered by **Open-Meteo**,
**OpenAQ**, **Leaflet Maps**, and internal SVG icons (no external assets
required).

It provides real-time weather, 24-hour forecasts, 5-day forecasts, AQI
analytics, UV index, wind analysis, mini-map navigation, automatic
geolocation, and animated weather overlays --- all inside a smooth,
responsive UI.

------------------------------------------------------------------------

## 🚀 Features

### ✔ Live Weather

-   Real-time temperature, wind speed, conditions\
-   Weather-coded dynamic icons\
-   Automatic location detection (GPS)

### ✔ Forecasts

-   **24-hour hourly forecast**
-   **5-day daily forecast**
-   Dynamic SVG icons for all conditions

### ✔ Maps & Locality Tools

-   Global **interactive weather map** (Leaflet.js)
-   Click anywhere on the map → get exact weather for that location
-   Built-in **mini-map** for multi-scale navigation

### ✔ Analytics Dashboard

Powered by Chart.js: - AQI (PM2.5) bar chart (nearest measuring
stations) - UV index graph (24h) - Humidity graph (24h) - Wind rose
chart (directional wind distribution)

### ✔ Smooth UI / UX

-   Animated rain, snow, storm overlays\
-   Fully responsive (mobile, tablet, desktop)\
-   Clean glass-morphism card design\
-   Fast auto-suggest search with live geocoding\
-   All icons stored using **inline SVG sprite** (no external folder)

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **JavaScript (ES6)**
-   **Open-Meteo API** (Weather & Forecast)
-   **OpenAQ API** (Air Quality)
-   **OpenStreetMap + Leaflet.js** (Map)
-   **Chart.js** (Graphs & analytics)
-   **Inline SVG Icons** (No external assets)
-   **HTML5 + CSS3** (UI & Layout)

------------------------------------------------------------------------

## 📁 Project Structure

    /
    ├── index.html        # Main App
    ├── style.css         # UI + Animations
    ├── script.js         # App Logic + API + Maps + Charts
    └── README.md         # Project Documentation

------------------------------------------------------------------------

## 🔧 Installation & Setup

You don't need Node.js or any backend.\
Just:

1.  Download the project or clone the repository.
2.  Open **index.html** in any browser.

That's it.\
Everything runs directly in the browser.

------------------------------------------------------------------------

## 🌍 API Services Used

### **Open-Meteo Weather API**

-   Current weather\
-   Hourly forecast\
-   Daily forecast\
-   UV index

### **OpenAQ -- Air Quality API**

-   PM2.5\
-   Nearest measuring stations

### **Nominatim Geocoding**

-   Location search\
-   Reverse geocoding for map clicks

### **OpenStreetMap Tiles**

-   Base map layer

------------------------------------------------------------------------

## 🧩 Key Components

### 🔹 Inline SVG Icon System

All icons (sun, rain, cloud, snow, etc.) are embedded directly in the
HTML.\
No external icon packs, no PNGs, no folders.

### 🔹 Animated Weather Overlays

-   Rain\
-   Snow\
-   Storm\
    (Triggered automatically based on weather code.)

### 🔹 Auto-Location

If enabled, the app instantly loads weather for the user's real
location.

### 🔹 Fully Dynamic Dashboard

Charts update instantly whenever you pick a new place.

------------------------------------------------------------------------

## 🤝 Author

**Himansu Kumar Sahu**\
WeatherSphere --- 2025\
Made with passion for clean UI and accurate meteorological data.

------------------------------------------------------------------------

## 📜 License

This project is free to use and modify. Attribution appreciated but not
required.

------------------------------------------------------------------------

## ⭐ Contribution

If you'd like features such as: - Dark/Light Mode\
- More weather animations\
- Global radar layers (rain, wind, satellite)\
- PWA offline mode\
- Premium UI redesign

Feel free to request or contribute!
