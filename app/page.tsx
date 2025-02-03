"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVariant } from "@/redux/slices/abTestSlice";
import { RootState } from "@/redux/store";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import RecentSearches from "@/app/components/RecentSearches";
import SearchBar from "@/app/components/SearchBar";
import { WeatherDisplay } from "@/app/components/WeatherDisplay";
import { getRecentSearches, addToRecentCities, formatCityName, updateSelectedCity, getSelectedCity } from "@/lib/storage";
import { City, Variant } from "@/types";

export default function Home() {
  const dispatch = useDispatch();
  const variant = useSelector((state: RootState) => state.abTest.variant) as Variant;

  const [cities, setCities] = useState<string[]>(
    typeof window !== "undefined" ? getRecentSearches() : []
  );
  const [selectedCity, setSelectedCity] = useState<string>(getSelectedCity());
  const [isClient, setIsClient] = useState(false);

  const handleCitySelected = (city: string) => {
    updateSelectedCity(city);
    setSelectedCity(city);
  }
  useEffect(() => {
    setIsClient(true); 

    if (typeof window !== "undefined") {
      const storedVariant = sessionStorage.getItem("variant") as Variant | null;
      if (storedVariant === "A" || storedVariant === "B") {
        dispatch(setVariant(storedVariant));
      } else {
        sessionStorage.setItem("variant", variant);
        dispatch(setVariant(variant));
      }
    }
  }, [dispatch, variant]);


const handleSearch = async (city: string) => {
  try {
    const formattedCity = formatCityName(city); 
    const response = await fetch(`http://localhost:3001/api/location/search?query=${formattedCity}`);
    const data: City[] = await response.json();

    if (data.length > 0) {
      handleCitySelected(formattedCity);
      const updatedCities = addToRecentCities(formattedCity);
      setCities(updatedCities);
    } else {
      console.error("City not found");
    }
  } catch (error) {
    console.error("Error fetching city:", error);
  }
};


  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4">
        <SearchBar onSearch={handleSearch} />

        {isClient && selectedCity && (
          <>
            <WeatherDisplay city={selectedCity} variant={variant} />
          </>
        )}
        {isClient &&
          <RecentSearches cities={cities} onCityClick={(city) => handleCitySelected(city)} />
        }

      </main>
    </ErrorBoundary>
  );
}
