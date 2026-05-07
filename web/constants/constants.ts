import type { ChestPainType, Gender, ThalassemiaType } from "./types";

export const MODEL_ACCURACY = 91;

export const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

export const CHEST_PAIN_OPTIONS: {
  label: string;
  value: ChestPainType;
  description: string;
}[] = [
  {
    label: "Typical Angina",
    value: "Typical Angina",
    description: "Classic chest pain triggered by exertion",
  },
  {
    label: "Atypical Angina",
    value: "Atypical Angina",
    description: "Chest pain not following the typical pattern",
  },
  {
    label: "Non-anginal Pain",
    value: "Non-anginal Pain",
    description: "Chest pain unrelated to heart",
  },
  {
    label: "Asymptomatic",
    value: "Asymptomatic",
    description: "No chest pain symptoms",
  },
];

export const THALASSEMIA_OPTIONS: {
  label: string;
  value: ThalassemiaType;
}[] = [
 {
    label: "Normal (Lowest Risk)",
    value: "Normal",
  },
  {
    label: "Unknown / Other (Moderate Risk)",
    value: "Unknown / Other",
  },
  {
    label: "Fixed Defect (High Risk)",
    value: "Fixed Defect",
  },
  {
    label: "Reversible Defect (Highest Risk)",
    value: "Reversible Defect",
  },
];

export const EXERCISE_ANGINA_OPTIONS: {
  label: string;
  value: 0 | 1;
}[] = [
  { label: "No", value: 0 },
  { label: "Yes", value: 1 },
];

export const FORM_DEFAULTS = {
  Age: 45,
  Gender: "Male" as Gender,
  Chest_Pain_Type: "Asymptomatic" as ChestPainType,
  Resting_Blood_Pressure: 120,
  Cholesterol_Level: 200,
  Maximum_Heart_Rate: 150,
  Exercise_Induced_Angina: 0 as 0 | 1,
  Thalassemia_Type: "Normal" as ThalassemiaType,
};

export const FIELD_RANGES = {
  Age: { min: 1, max: 120 },
  Resting_Blood_Pressure: { min: 60, max: 250 },
  Cholesterol_Level: { min: 50, max: 600 },
  Maximum_Heart_Rate: { min: 60, max: 250 },
};

export const RISK_MESSAGES = {
  high: [
    "Please consult a cardiologist immediately.",
    "Lifestyle changes and medical attention are strongly advised.",
    "Your results warrant urgent medical evaluation.",
  ],
  low: [
    "Keep up your healthy habits!",
    "Continue regular checkups to stay heart-healthy.",
    "Great news - maintain your lifestyle choices.",
  ],
};