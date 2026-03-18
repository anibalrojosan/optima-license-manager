from fastapi import FastAPI

from app.api.v1 import auth

app = FastAPI(title="Optima API")

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Optima Backend is running"}