from fastapi import FastAPI

app = FastAPI(title="Optima API")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Optima Backend is running"}