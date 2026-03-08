from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["example"])


@router.get("/example")
def example() -> dict:
    """Placeholder for app logic / AI orchestration."""
    return {"message": "Hello from FastAPI. Replace this with your API logic."}
