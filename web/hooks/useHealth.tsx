"use client";

import { useState } from "react";
import axios from "axios";

import type { HealthResponse } from "@/constants/types";

interface UseHealthReturn {
  checkHealth: () => Promise<void>;
  health: HealthResponse | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useHealth(): UseHealthReturn {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setIsLoading(true);
    setError(null);
    setHealth(null);

    try {
      const response = await axios.get<HealthResponse>(
        "/api/model/health",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setHealth(response.data);

    } catch (err) {

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Health check failed."
        );
      } else {
        setError("Health check failed.");
      }

    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setHealth(null);
    setError(null);
  };

  return {
    checkHealth,
    health,
    isLoading,
    error,
    reset,
  };
}