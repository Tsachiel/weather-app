export const formatCityName = (city: string): string => {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};



export const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];

  const storedSearches = sessionStorage.getItem("recentSearches");
  return storedSearches ? JSON.parse(storedSearches) : [];
};

export const addToRecentCities = (city: string): string[] => {
  if (typeof window === "undefined") return [];

  const formattedCity = formatCityName(city); 
  const recentSearches = getRecentSearches();

  if (!recentSearches.includes(formattedCity)) {
    recentSearches.unshift(formattedCity); 
    if (recentSearches.length > 5) recentSearches.pop(); 
    sessionStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }

  return recentSearches;
};

export const updateSelectedCity = (city: string) => {
  if (typeof window !== "undefined"){
    sessionStorage.setItem("selectedCity", JSON.stringify(city));
  }
}

export const getSelectedCity = ():string => {
  if (typeof window !== "undefined") {
    const selectedCity = sessionStorage.getItem("selectedCity");
    if(selectedCity) return JSON.parse(selectedCity)
  }
  return "";
}
