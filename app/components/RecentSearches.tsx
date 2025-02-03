import { getRecentSearches } from "@/lib/storage";

type RecentSearchesProps = {
  cities: string[];
  onCityClick: (city: string) => void;
};

export default function RecentSearches({ onCityClick }: RecentSearchesProps) {
  const recentCities = getRecentSearches();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-300">
        Recent Searches
      </h2>
      {recentCities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {recentCities.map((city, index) => (
            <button
              key={index}
              onClick={() => onCityClick(city)}
              className="px-4 py-2 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 capitalize"
            >
              {city}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent searches</p>
      )}
    </div>
  );
}
