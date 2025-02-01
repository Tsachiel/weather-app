export type WeatherData = {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
  };
  
  export type City = {
    name: string;
    lastViewed: number;
    isFavorite: boolean;
  };
  
  export type Variant = 'A' | 'B';
  