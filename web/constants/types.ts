export type Gender = "Male" | "Female";

export type ChestPainType =
  | "Typical Angina"
  | "Atypical Angina"
  | "Non-anginal Pain"
  | "Asymptomatic";

export type ThalassemiaType =
  | "Normal"
  | "Fixed Defect"
  | "Reversible Defect"
  | "Unknown / Other";

export interface HeartFormData {
  Age: number;
  Gender: Gender;
  Chest_Pain_Type: ChestPainType;
  Resting_Blood_Pressure: number;
  Cholesterol_Level: number;
  Maximum_Heart_Rate: number;
  Exercise_Induced_Angina: 0 | 1;
  Thalassemia_Type: ThalassemiaType;
}

export interface PredictResponse {
  success: boolean;
  prediction: 0 | 1;
  risk: "High Risk" | "Low Risk";
  probability: number | null;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export interface ApiError {
  detail: string;
}