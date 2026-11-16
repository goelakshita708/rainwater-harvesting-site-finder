
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SiteData(BaseModel):
    latitude: float
    longitude: float
    rainfall: float
    slope: float
    soil: Literal["Sandy", "Loamy", "Clay", "Clay Loam", "Rocky"]
    land_use: Literal[
        "Agricultural", "Residential", "Forest", "Barren", "Water Body"
    ]
    drainage: Literal["Poor", "Moderate", "Good"]


def get_recommendation(data):
    if data.land_use == "Residential":
        return "Rooftop Rainwater Harvesting"

    if data.drainage == "Good" and data.slope >= 5:
        return "Check Dam"

    if data.land_use == "Agricultural" and 1 <= data.slope <= 8:
        return "Farm Pond"

    if data.soil in ["Loamy", "Sandy"] and data.slope < 5:
        return "Recharge Pit"

    return "Contour Trench"


def analyze_site(data):
    # Rainfall score out of 30
    if data.rainfall >= 1000:
        rainfall_score = 30
    elif data.rainfall >= 800:
        rainfall_score = 25
    elif data.rainfall >= 600:
        rainfall_score = 20
    elif data.rainfall >= 400:
        rainfall_score = 12
    else:
        rainfall_score = 5

    # Slope score out of 25
    if 2 <= data.slope <= 5:
        slope_score = 25
    elif 0 <= data.slope < 2:
        slope_score = 20
    elif data.slope <= 10:
        slope_score = 15
    elif data.slope <= 15:
        slope_score = 8
    else:
        slope_score = 3

    # Soil score out of 20
    if data.soil == "Loamy":
        soil_score = 20
    elif data.soil == "Clay Loam":
        soil_score = 18
    elif data.soil == "Clay":
        soil_score = 14
    elif data.soil == "Sandy":
        soil_score = 12
    else:
        soil_score = 5

    # Land use score out of 15
    if data.land_use == "Agricultural":
        land_score = 15
    elif data.land_use == "Barren":
        land_score = 13
    elif data.land_use == "Forest":
        land_score = 8
    elif data.land_use == "Residential":
        land_score = 5
    else:
        land_score = 0

    # Drainage score out of 10
    if data.drainage == "Good":
        drainage_score = 10
    elif data.drainage == "Moderate":
        drainage_score = 7
    else:
        drainage_score = 3

    total_score = (
        rainfall_score
        + slope_score
        + soil_score
        + land_score
        + drainage_score
    )

    if total_score >= 75:
        category = "Highly Suitable"
    elif total_score >= 50:
        category = "Moderately Suitable"
    else:
        category = "Low Suitability"

    recommendation = get_recommendation(data)

    return {
        "score": total_score,
        "category": category,
        "recommendation": recommendation,
        "score_breakdown": {
            "Rainfall": rainfall_score,
            "Slope": slope_score,
            "Soil": soil_score,
            "Land Use": land_score,
            "Drainage": drainage_score
        }
    }


@app.get("/")
def home():
    return {
        "message": "Rainwater Harvesting Site Finder is running"
    }


@app.post("/analyze")
def analyze(data: SiteData):
    return analyze_site(data)
