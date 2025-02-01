import { City } from "@/types";

export const addToRecentCities = (cityName: string) => {
  const cities: City[] = [];

  cities.unshift({
    name: cityName,
    lastViewed: Date.now(),
    isFavorite: false,
  });

  // Keep only last 5 cities
  const updatedCities = cities.slice(0, 5);
  return updatedCities;
};
