from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.schemas import users as UserSchemas
from app.schemas import enums
from app.crud import users as UsersCRUD
from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from utils.pwd import hash_password

users_router = APIRouter()


@users_router.post("/user")
async def new_user(user_p: UserSchemas.AddUserPermission, db: DB = Depends(get_db)):
    try:
        is_exist = await UsersCRUD.query_user_with_email(db, user_p.email)
        if is_exist:
            return JSONResponse(
                status_code=400,
                content={"message": "email is exist"},
            )
        await UsersCRUD.insert_new_user(db, user_p, hash_password(user_p.password))
        return JSONResponse(
            status_code=200,
            content={"message": "new user add successful."}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.put("/user")
async def update_user(user_p: UserSchemas.UpdateUserPermission, db: DB = Depends(get_db)):
    try:
        await UsersCRUD.update_user(db, user_p)
        return JSONResponse(
            status_code=200,
            content={"message": "new user add successful."}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.get("/users")
async def query_user(user_info: dict = Depends(get_user_info), db: DB = Depends(get_db)):
    try:
        users = None
        if user_info["category"] == "01":
            users = await UsersCRUD.query_users_for_head(db)
        if user_info["category"] == "02":
            users = await UsersCRUD.query_users_for_branch(db)
        return JSONResponse(
            status_code=200,
            content=users
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.get("/users/{category}")
async def query_users(category: str, db: DB = Depends(get_db)):
    try:
        users = await UsersCRUD.query_users_with_category(db, category)
        return JSONResponse(
            status_code=200,
            content=users
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.get("/user/{user_id}")
async def query_user(user_id: int, db: DB = Depends(get_db)):
    try:
        user = await UsersCRUD.query_user_with_id(db, user_id)
        return JSONResponse(
            status_code=200,
            content=user
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
