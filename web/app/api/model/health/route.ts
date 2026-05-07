import { NextResponse } from "next/server";
import type { HealthResponse } from "@/constants/types";
import axios from "axios";

export async function GET() {
  try {
    const mlServiceUrl = process.env.NEXT_PRIVATE_ML_SERVICE_URL!;

    if (!mlServiceUrl) {
      return NextResponse.json(
        { status: "error", message: "ML service URL not configured" },
        { status: 500 }
      );
    }

    const response = await axios.get(`${mlServiceUrl}/health`);
    const data: HealthResponse = response.data;

    if (!data || data.status !== "ok") {
      return NextResponse.json(
        {
          status: "error",
          message: `ML service returned ${response.status}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Health Check Error]", error);
    return NextResponse.json(
      {
        status: "error",
        message: "ML service is unreachable. Please try again later.",
      },
      { status: 503 }
    );
  }
}