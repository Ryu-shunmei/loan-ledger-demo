from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from configs.app import app_conf
from providers import loger
from providers import db

from app.endpoints.users import users_router
from app.endpoints.auth import auth_router
from app.endpoints.branchs import branchs_router
from app.endpoints.banks import banks_router
from app.endpoints.cases import cases_router
# スタートアップ前のイベント


@asynccontextmanager
async def lifespan(app: FastAPI):
    # グローバルログの初期化
    await loger.register()
    # データベースプールの初期化
    await db.register()
    yield


app = FastAPI(
    title=app_conf.NAME,
    version=app_conf.VERSION,
    debug=app_conf.DEBUG,
    docs_url=app_conf.DOCS,
    redoc_url=app_conf.DOCS,
    openapi_url=app_conf.OPENAPI,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users_router)
app.include_router(auth_router)
app.include_router(branchs_router)
app.include_router(banks_router)
app.include_router(cases_router)

if __name__ == "__main__":
    from uvicorn import run

    run(app="main:app", host="0.0.0.0", port=8080, reload=True)
