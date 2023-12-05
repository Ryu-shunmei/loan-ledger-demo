from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from app.crud import branchs_crud

branchs_router = APIRouter()


@branchs_router.get("/branchs")
async def get_branchs(db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        branchs = await branchs_crud.query_branchs(db)
        return JSONResponse(
            status_code=200,
            content=branchs
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@branchs_router.post("/branch")
async def new_branch(branch_data: dict, db: DB = Depends(get_db), user: dict = Depends(get_user_info)):
    try:
        branch_data_kill = {}
        for k, v in branch_data.items():
            if v == "":
                branch_data_kill[k] = None
            elif v == True:
                branch_data_kill[k] = 1
            elif v == False:
                branch_data_kill[k] = None
            else:
                branch_data_kill[k] = v
        await branchs_crud.insert_branch(db, branch_data_kill)
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


@branchs_router.put("/branch")
async def update_branch(branch_data: dict, db: DB = Depends(get_db), user: dict = Depends(get_user_info)):
    try:
        branch_data_kill = {}
        for k, v in branch_data.items():
            if v == "":
                branch_data_kill[k] = None
            elif v == True:
                branch_data_kill[k] = 1
            elif v == False:
                branch_data_kill[k] = None
            else:
                branch_data_kill[k] = v
        await branchs_crud.update_branch(db, branch_data_kill)
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


@branchs_router.get("/branch")
async def new_branch(id: int, db: DB = Depends(get_db), user: dict = Depends(get_user_info)):
    try:
        branch = await branchs_crud.query_branch(db, id)
        return JSONResponse(
            status_code=200,
            content=branch
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
