from loguru import logger
from fastapi import APIRouter
from fastapi import Depends

from fastapi.responses import JSONResponse
from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from app.crud import banks_crud

banks_router = APIRouter()


@banks_router.get("/banks")
async def get_banks(db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        banks = await banks_crud.query_banks(db)
        return JSONResponse(
            status_code=200,
            content=banks
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@banks_router.get("/bank/{bank_id}")
async def get_bank(bank_id: int, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        bank = await banks_crud.query_bank(db, bank_id)
        return JSONResponse(
            status_code=200,
            content=bank
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@banks_router.post("/bank")
async def new_bank(bank: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        bank_kill = {}
        for k, v in bank.items():
            bank_kill[k] = None if v == "" else v

        await banks_crud.insert_bank(db, bank_kill)
        return JSONResponse(
            status_code=200,
            content={"message": "bank created!"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@banks_router.put("/bank")
async def new_bank(bank: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        bank_kill = {}
        for k, v in bank.items():
            bank_kill[k] = None if v == "" else v

        await banks_crud.update_bank(db, bank_kill)
        return JSONResponse(
            status_code=200,
            content={"message": "bank updated!"}
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
