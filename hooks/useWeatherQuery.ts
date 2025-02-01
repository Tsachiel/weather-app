import { useState, useEffect } from 'react';
import { WeatherData } from '@/types';

export const useWeatherQuery = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};