import { NextRequest, NextResponse } from "next/server";
import type { HeartFormData, PredictResponse } from "@/constants/types";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const mlServiceUrl = process.env.NEXT_PRIVATE_ML_SERVICE_URL;

    if (!mlServiceUrl) {
      return NextResponse.json(
        { detail: "ML service URL not configured" },
        { status: 500 }
      );
    }

    const body: HeartFormData = await req.json();

    // Basic validation
    if (
      body.Age === undefined ||
      !body.Gender ||
      !body.Chest_Pain_Type ||
      body.Resting_Blood_Pressure === undefined ||
      body.Cholesterol_Level === undefined ||
      body.Maximum_Heart_Rate === undefined ||
      body.Exercise_Induced_Angina === undefined ||
      !body.Thalassemia_Type
    ) {
      return NextResponse.json(
        { detail: "Missing required fields" },
        { status: 400 }
      );
    }

    
    const response = await axios.post(`${mlServiceUrl}/predict`, body);

    const data: PredictResponse = response.data;

    if (!data.success) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[Predict Error]", error);
    return NextResponse.json(
      { detail: "Prediction service is unavailable. Please try again later." },
      { status: 503 }
    );
  }
}