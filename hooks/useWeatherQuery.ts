import { useState, useEffect } from "react";
import { WeatherData } from "@/types";

export function useWeatherQuery(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    fetch(`/api/weather?city=${city}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return response.json();
      })
      .then((data: WeatherData) => {
        setWeather(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch weather data");
      })
      .finally(() => setLoading(false));
  }, [city]);

  return { weather, loading, error };
}
