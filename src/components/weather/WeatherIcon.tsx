import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle,
  Moon,
  CloudSun,
  CloudMoon,
  Wind
} from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherIconProps {
  weatherId: number;
  icon?: string;
  size?: number;
  className?: string;
  animated?: boolean;
}

export const WeatherIcon = ({ 
  weatherId, 
  icon, 
  size = 48, 
  className = '',
  animated = false 
}: WeatherIconProps) => {
  const isNight = icon?.includes('n');
  
  const getIcon = () => {
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
      return <CloudLightning size={size} className={className} />;
    }
    // Drizzle
    if (weatherId >= 300 && weatherId < 400) {
      return <CloudDrizzle size={size} className={className} />;
    }
    // Rain
    if (weatherId >= 500 && weatherId < 600) {
      return <CloudRain size={size} className={className} />;
    }
    // Snow
    if (weatherId >= 600 && weatherId < 700) {
      return <CloudSnow size={size} className={className} />;
    }
    // Atmosphere (fog, mist, etc.)
    if (weatherId >= 700 && weatherId < 800) {
      return <CloudFog size={size} className={className} />;
    }
    // Clear
    if (weatherId === 800) {
      return isNight 
        ? <Moon size={size} className={className} />
        : <Sun size={size} className={className} />;
    }
    // Few clouds
    if (weatherId === 801) {
      return isNight
        ? <CloudMoon size={size} className={className} />
        : <CloudSun size={size} className={className} />;
    }
    // Clouds
    if (weatherId > 801) {
      return <Cloud size={size} className={className} />;
    }
    
    return <Wind size={size} className={className} />;
  };

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="animate-float"
      >
        {getIcon()}
      </motion.div>
    );
  }

  return getIcon();
};
