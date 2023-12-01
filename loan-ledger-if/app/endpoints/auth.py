from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.schemas import users as UserSchemas
from app.schemas import enums
from app.crud import users as UsersCRUD
from app.dependencies import get_db, DB


from utils.jwt import gen_access_token
from utils.pwd import verify_password

auth_router = APIRouter()


@auth_router.post("/token")
async def login_for_token(auth_info: UserSchemas.UserAuth, db: DB = Depends(get_db)):
    try:
        is_exist = await UsersCRUD.query_user_for_token(db, auth_info.email)
        if is_exist is None:
            return JSONResponse(
                status_code=400,
                content={"message": "email is not exist"},
            )
        if verify_password(auth_info.password, is_exist["password"]):
            del is_exist["password"]
            access_token = gen_access_token(payload=is_exist)
            return JSONResponse(
                status_code=200,
                content={"access_token": access_token}
            )
        else:
            return JSONResponse(
                status_code=400,
                content={"message": "password is error."},
            )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
