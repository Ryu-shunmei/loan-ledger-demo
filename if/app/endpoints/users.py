from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse


from app.crud import users_crud
from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from utils.pwd import hash_password

users_router = APIRouter()


@users_router.get("/users")
async def query_user(branch_office_id: int = None, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        users = None
        if branch_office_id:
            users = await users_crud.query_users_for_category_02(db, branch_office_id)
        if branch_office_id is None:
            users = await users_crud.query_users_for_category_01(db)
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


@users_router.get("/target_users")
async def query_user(id: int, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:

        users = await users_crud.query_target_users(db, id)
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


@users_router.post("/user")
async def insert_user(user_data: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        user_data_kill = {}
        for k, v in user_data.items():
            user_data_kill[k] = None if v == "" else v
        await users_crud.insert_new_user(db, user_data_kill)
        return JSONResponse(
            status_code=200,
            content={"message": "ok"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.put("/user")
async def update_user(user_data: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        user_data_kill = {}
        for k, v in user_data.items():
            user_data_kill[k] = None if v == "" else v
        await users_crud.update_user(db, user_data_kill)
        return JSONResponse(
            status_code=200,
            content={"message": "ok"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.get("/user")
async def get_user(id: int, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:

        user = await users_crud.query_user(db, id)
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


@users_router.post("/role")
async def add_role(user_id: int, role_data: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        role_data_kill = {}
        for k, v in role_data.items():
            if v == "":
                role_data_kill[k] = None
            elif v == True:
                role_data_kill[k] = 1
            elif v == False:
                role_data_kill[k] = None
            else:
                role_data_kill[k] = v
        await users_crud.insert_role(db, role_data_kill, user_id)
        return JSONResponse(
            status_code=200,
            content={"message": "ok"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.put("/role")
async def update_role(role_data: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        role_data_kill = {}
        for k, v in role_data.items():
            if v == "":
                role_data_kill[k] = None
            elif v == True:
                role_data_kill[k] = 1
            elif v == False:
                role_data_kill[k] = None
            else:
                role_data_kill[k] = v
        await users_crud.update_role(db, role_data_kill)
        return JSONResponse(
            status_code=200,
            content={"message": "ok"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.put("/target_role")
async def switch_target_role(user_id: int, role_id, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:

        await users_crud.switch_role(db, user_id, role_id)
        return JSONResponse(
            status_code=200,
            content={"message": "ok"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.get("/role")
async def get_role(role_id: int, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:

        role = await users_crud.query_role(db, role_id)
        return JSONResponse(
            status_code=200,
            content=role
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@users_router.get("/user/category")
async def get_manager_user(db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:

        managers = await users_crud.query_managers(db)
        return JSONResponse(
            status_code=200,
            content=managers
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
