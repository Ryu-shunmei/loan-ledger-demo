from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_prefix="DB_", env_file_encoding="utf8", strict=False
    )
    HOST: str
    PORT: int
    USER: str
    NAME: str
    PASSWORD: str


db_conf = Settings()