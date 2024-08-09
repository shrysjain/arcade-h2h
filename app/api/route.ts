import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get("apiKey");

  try {
    const response = await axios.get(
      "https://hackhour.hackclub.com/api/stats/x",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: (error as any).message });
  }
}
