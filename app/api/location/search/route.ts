import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`Failed to fetch city data: ${response.statusText}`);

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
