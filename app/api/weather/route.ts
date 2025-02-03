import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const city = url.searchParams.get("city");

    if (!city) {
      return NextResponse.json({ error: "City parameter is required" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.statusText}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
