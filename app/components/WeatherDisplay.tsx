"use client";

import { useEffect } from "react";
import { useToggle } from "@/hooks/useToggle"; 
import { useWeatherQuery } from "@/hooks/useWeatherQuery"; 
import { Variant } from "@/types";

import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"; 

type WeatherDisplayProps = {
  city: string;
  variant: Variant;
};

const WeatherIcon = ({ description }: { description: string }) => {
  const icon = description.toLowerCase().includes("rain") ? (
    <CloudRain className="w-8 h-8" />
  ) : description.toLowerCase().includes("cloud") ? (
    <Cloud className="w-8 h-8" />
  ) : (
    <Sun className="w-8 h-8" />
  );

  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-full">{icon}</div>
  );
};

export function WeatherDisplay({ city, variant }: WeatherDisplayProps) {
  const { value: isVariantA, toggle } = useToggle(variant === "A");
  const { weather, loading, error } = useWeatherQuery(city); 

  useEffect(() => {
    const storedVariant = sessionStorage.getItem("variant");
    if (storedVariant === "A" || storedVariant === "B") {
      toggle(storedVariant === "A");
    }
  }, []);

  if (loading)
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="w-full p-6 bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg">
        <div className="text-red-500 dark:text-red-400 text-center">
          <span className="font-semibold">Error:</span> {error}
        </div>
      </div>
    );

  if (!weather) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className={isVariantA ? "text-3xl font-bold text-blue-800 dark:text-gray-100 capitalize" :"text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize"}>
              {city}
            </h2>
            <span className={isVariantA ? "dark:bg-gray-800 bg-gray-50 border-none ms-auto px-2 py-1 text-sm border border-red-200 dark:border-gray-600 text-blue-700 dark:text-blue-300 rounded-full" : "px-2 py-1 text-sm border border-gray-200 dark:border-gray-600 text-blue-700 dark:text-blue-300 rounded-full"}>
              Celsius
            </span>
          </div>

          <div className="flex items-center gap-4">
            <WeatherIcon description={weather.weather[0].description} />
            <div>
              <p className={isVariantA ? "text-5xl font-bold text-blue-800 dark:text-gray-100" : "text-5xl font-bold text-gray-800 dark:text-gray-100"}>
                {Math.round(weather.main.temp)}°C
              </p>
              <p className={isVariantA ? "text-lg text-blue-600 dark:text-gray-300 capitalize" : "text-lg text-gray-600 dark:text-gray-300 capitalize"}>
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </div>

        {isVariantA ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <Droplets className={`w-4 h-4 ${isVariantA ? "text-blue-600 dark:text-blue-400" : ""}`} />
                Humidity
              </div>
              <dd className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {weather.main.humidity}%
              </dd>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <Wind className={`w-4 h-4 ${isVariantA ? "text-blue-600 dark:text-blue-400" : ""}`} />
                Wind Speed
              </div>
              <dd className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {weather.wind.speed} m/s
              </dd>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg col-span-2 sm:col-span-1 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Sun className={`w-4 h-4 ${isVariantA ? "text-blue-600 dark:text-blue-400" : ""}`} />
                  Feels Like
                </div>
                <dd className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {Math.round(weather.main.feels_like)}°C
                </dd>
              </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
              <Droplets className="w-4 h-4" />
                Humidity
              </div>
              <dd className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {weather.main.humidity}%
              </dd>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                <Wind className="w-4 h-4" />
                Wind Speed
              </div>
              <dd className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {weather.wind.speed} m/s
              </dd>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

