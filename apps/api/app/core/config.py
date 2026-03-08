from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Load from environment. Add keys as needed (e.g. OPENAI_API_KEY, QDRANT_URL)."""

    frontend_origin: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
