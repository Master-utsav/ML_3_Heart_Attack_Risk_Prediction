from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import os
import joblib
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

#model loading
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(
    BASE_DIR,
    "model",
    "heart_attack_risk_check_model.joblib"
)

try:
    model = joblib.load(model_path)
    print("Model loaded successfully")

except Exception as e:
    print(f"Failed to load model: {e}")
    model = None

#fastapi app init
app = FastAPI(
    title="Heart Attack Risk Checker API",
    description="Predict heart attack risk using ML",
    version="1.0.0"
)

# corS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #  !TODO production mein specific origins set karna hai
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Schema
class HeartData(BaseModel):
    Age: int
    Gender: str
    Chest_Pain_Type: str
    Resting_Blood_Pressure: float
    Cholesterol_Level: float
    Maximum_Heart_Rate: float
    Exercise_Induced_Angina: int
    Thalassemia_Type: str

gender_map = {
    "Female": 0,
    "Male": 1
}

chest_pain_map = {
    "Typical Angina": 3,
    "Atypical Angina": 1,
    "Non-anginal Pain": 2,
    "Asymptomatic": 0
}

thalassemia_map = {
    "Normal": 3,
    "Reversible Defect": 0,
    "Fixed Defect": 1,
    "Unknown / Other": 2
}

# helth route
@app.get("/health")
def health():
    return {
        "status": "ok",
        "message": "Heart Attack Risk Checker API is running"
    }

@app.post("/predict")
def predict(data: HeartData):

    try:

        # Check model loaded
        if model is None:
            raise HTTPException(
                status_code=500,
                detail="Model not loaded"
            )
        
        gender_value = gender_map.get(data.Gender)
        chest_pain_value = chest_pain_map.get(data.Chest_Pain_Type)
        thal_value = thalassemia_map.get(data.Thalassemia_Type)

        # Validate mappings
        if gender_value is None:
            raise HTTPException(
                status_code=400,
                detail="Invalid Gender value"
            )

        if chest_pain_value is None:
            raise HTTPException(
                status_code=400,
                detail="Invalid Chest Pain Type value"
            )

        if thal_value is None:
            raise HTTPException(
                status_code=400,
                detail="Invalid Thalassemia Type value"
            )

        # Convert inp to df
        input_data = pd.DataFrame([{
            "Age": data.Age,
            "Gender": gender_value,
            "Chest Pain Type": chest_pain_value,
            "Resting Blood Pressure": data.Resting_Blood_Pressure,
            "Cholesterol Level": data.Cholesterol_Level,
            "Maximum Heart Rate": data.Maximum_Heart_Rate,
            "Exercise Induced Angina": data.Exercise_Induced_Angina,
            "Thalassemia Type": thal_value
        }])

        # Prediction
        prediction = model.predict(input_data)[0]
        # Probability
        probability = None
        if hasattr(model, "predict_proba"):
            probability = float(model.predict_proba(input_data)[0][1]) * 100

        return {
            "success": True,
            "prediction": int(prediction),
            "risk": (
                "High Risk"
                if prediction == 1
                else "Low Risk"
            ),
            "probability": probability
        }

    except HTTPException as http_error:
        raise http_error

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# Run Locally
# if __name__ == "__main__":

#     import uvicorn

#     host = os.getenv("HOST", "127.0.0.1")
#     port = int(os.getenv("PORT", 5000))

#     uvicorn.run(
#         "app:app",
#         host=host,
#         port=port,
#         reload=True
#     )