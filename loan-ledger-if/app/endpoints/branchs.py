from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from app.crud import branchs as branchsCRUD
from app.schemas import branchs as branchsSchemas

branchs_router = APIRouter()


@branchs_router.get("/branchs")
async def get_branchs(db: DB = Depends(get_db)):
    try:
        branchs = await branchsCRUD.query_branchs(db)
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
async def new_branch(branch: branchsSchemas.AddBranch, db: DB = Depends(get_db), user: dict = Depends(get_user_info)):
    try:
        await branchsCRUD.insert_branch(db, branch, user["head_office_id"])
        return JSONResponse(
            status_code=200,
            content={"message": "branch created!"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@branchs_router.put("/branch")
async def update_branch(branch: branchsSchemas.UpdateBranch, db: DB = Depends(get_db), user: dict = Depends(get_user_info)):
    try:
        await branchsCRUD.update_branch(db, branch, user["head_office_id"])
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@branchs_router.get("/branch/{branch_id}")
async def new_branch(branch_id: int, db: DB = Depends(get_db), user: dict = Depends(get_user_info)):
    try:
        branch = await branchsCRUD.query_branch(db, branch_id)
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
