"use client";

import { useState } from "react";
import axios from "axios";

import type {
  HeartFormData,
  PredictResponse,
} from "@/constants/types";

interface UsePredictReturn {
  predict: (data: HeartFormData) => Promise<void>;
  result: PredictResponse | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function usePredict(): UsePredictReturn {
  const [result, setResult] = useState<PredictResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const predict = async (data: HeartFormData) => {

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {

      const response = await axios.post<PredictResponse>(
        "/api/model/predict",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data);

    } catch (err) {

      if (axios.isAxiosError(err)) {

        setError(
          err.response?.data?.detail ||
          err.message ||
          "Prediction failed. Please try again."
        );

      } else {

        setError("An unexpected error occurred.");

      }

    } finally {

      setIsLoading(false);

    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    predict,
    result,
    isLoading,
    error,
    reset,
  };
}