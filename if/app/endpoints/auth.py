from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse
from app.dependencies import get_db, DB

from app.crud import auth_crud

from utils.jwt import gen_access_token

auth_router = APIRouter()


@auth_router.post("/token")
async def token(auth_info: dict, db: DB = Depends(get_db)):
    try:
        is_exist = await auth_crud.check_user_is_exist(db, auth_info["email"])
        if is_exist is None:
            return JSONResponse(
                status_code=400,
                content={"message": "email is not exist"},
            )
        if auth_info["password"] == is_exist["password"]:
            payload = await auth_crud.query_token_payload(db, is_exist["id"])
            access_token = gen_access_token(payload=payload)
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


@auth_router.put("/token")
async def update_token(id: str, db: DB = Depends(get_db)):
    try:
        payload = await auth_crud.query_token_payload(db, id)
        access_token = gen_access_token(payload=payload)
        return JSONResponse(
            status_code=200,
            content={"access_token": access_token}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@auth_router.put("/{user_id}/curr_role_id")
async def put_curr_role(user_id: int, role_id: int, db: DB = Depends(get_db)):
    try:
        await auth_crud.update_user_curr_role_id(db, user_id, role_id)
        payload = await auth_crud.query_token_payload(db, user_id)
        access_token = gen_access_token(payload=payload)
        return JSONResponse(
            status_code=200,
            content={"access_token": access_token}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
