import { City } from "@/types";
type RecentSearches = {
  cities: City[];
  onCityClick: (city: string) => void;
};

export default function RecentSearches({
  cities,
  onCityClick,
}: RecentSearches) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-300">
        Recent Searches
      </h2>
      {cities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {cities.map((city, index) => (
            <div key={index} className="flex gap-2">
              <button
                key={index}
                onClick={() => onCityClick(city.name)}
                className="px-4 py-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 capitalize"
              >
                {city.name}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent searches</p>
      )}
    </div>
  );
}
