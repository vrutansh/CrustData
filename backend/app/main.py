from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.planner import router as planner_router

app = FastAPI(title="Crustflow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(planner_router)

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
