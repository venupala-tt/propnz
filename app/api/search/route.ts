import { NextResponse } from "next/server";

const mockData = [
  { id: "1", title: "Luxury Apartment", description: "3BHK in city center", location: "Hyderabad" },
  { id: "2", title: "Villa with Garden", description: "Spacious villa with greenery", location: "Bangalore" },
  { id: "3", title: "Affordable Studio", description: "Perfect for singles", location: "Chennai" },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    const results = mockData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
    );

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
