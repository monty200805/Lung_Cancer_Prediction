from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

app = FastAPI(
    title="Lung Cancer Risk Prediction ML Service",
    description="Serves predictions from a Bagging classifier trained with forward feature elimination.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {"message": "Lung Cancer Risk Prediction ML Service", "docs": "/docs"}
