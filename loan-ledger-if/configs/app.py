from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_prefix="APP_", env_file_encoding="utf8", strict=False
    )

    NAME: str = "mortgage_loan_tool_if"
    VERSION: str = "0.1.0"
    ENV: str = "dev"

    @property
    def DOCS(self) -> bool:
        if self.ENV.lower() != "prd":
            return None
        else:
            return "/"

    @property
    def OPENAPI(self) -> bool:
        if self.ENV.lower() != "prd":
            return None
        else:
            return "/openapi.json"

    @property
    def DEBUG(self) -> bool:
        if self.ENV.lower() != "prd":
            return True
        else:
            return False


app_conf = Settings()
