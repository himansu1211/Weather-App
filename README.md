# WeatherSphere

An interactive weather dashboard built with React, TypeScript, and modern web technologies. Features live location tracking, interactive maps, and comprehensive weather forecasts powered by Open-Meteo API.

![WeatherSphere](https://img.shields.io/badge/WeatherSphere-v1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite)

## 🌟 Features

- **Interactive Map**: Click anywhere on the map to get weather data for that location
- **Live Location Tracking**: Get weather for your current location with one click
- **Comprehensive Forecasts**: Current weather, hourly forecasts, and 7-day predictions
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Powered by Open-Meteo API for accurate, up-to-date weather information
- **Location Services**: Reverse geocoding using Nominatim for location names

## 🚀 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Maps**: Leaflet with React-Leaflet
- **State Management**: React Query for data fetching
- **Routing**: React Router
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Weather API**: Open-Meteo (free, no API key required)
- **Geocoding**: Nominatim (OpenStreetMap)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/himansu1211/weather-app.git>
   cd weathersphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8081` (or the port shown in your terminal)

## 🏗️ Project Structure

```
weathersphere2/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── ui/            # Reusable UI components (shadcn/ui)
│   │   └── weather/       # Weather-specific components
│   ├── hooks/             # Custom React hooks
│   │   ├── useGeolocation.ts  # Location tracking
│   │   └── useWeather.ts     # Weather data management
│   ├── lib/
│   │   ├── constants.ts   # API endpoints and configuration
│   │   └── utils.ts       # Utility functions
│   ├── pages/             # Route components
│   ├── types/             # TypeScript type definitions
│   └── test/              # Test files
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🔧 Configuration

### API Endpoints

The application uses the following APIs:

- **Weather Data**: `https://api.open-meteo.com/v1/forecast`
- **Geocoding**: `https://nominatim.openstreetmap.org/search`
- **Reverse Geocoding**: `https://nominatim.openstreetmap.org/reverse`

No API keys are required - Open-Meteo provides free weather data, and Nominatim provides free geocoding services.

## 📱 Usage

### Getting Weather Data

1. **Current Location**: Click the "Locate Me" button on the map to get weather for your current position
2. **Custom Location**: Click anywhere on the interactive map to select a location
3. **Search**: The map allows you to pan and zoom to find specific locations

### Features Overview

- **Current Weather**: Displays temperature, conditions, humidity, wind speed, and more
- **Hourly Forecast**: 24-hour weather predictions with precipitation probability
- **Weekly Forecast**: 7-day weather outlook
- **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F)
- **Location Info**: Shows city name and coordinates

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Open-Meteo**: For providing free, comprehensive weather data
- **OpenStreetMap/Nominatim**: For geocoding services
- **shadcn/ui**: For beautiful, accessible UI components
- **Leaflet**: For the interactive mapping functionality

---

**WeatherSphere** - Your interactive weather companion 🌤️
