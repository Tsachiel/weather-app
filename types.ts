export type WeatherData = {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};

export type City = {
  name: string;
  lastViewed: number;
  isFavorite: boolean;
};

export type VariantBProps = {
  humidity: number;
  windSpeed: number;
};

export type VariantAProps = VariantBProps & {
  feelsLike: number;
};

export type Variant = "A" | "B";
