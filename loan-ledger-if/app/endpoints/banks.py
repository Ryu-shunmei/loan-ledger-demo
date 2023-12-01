from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from app.crud import banks as banksCRUD
from app.schemas import banks as banksSchemas

banks_router = APIRouter()


@banks_router.get("/banks")
async def get_banks(db: DB = Depends(get_db)):
    try:
        banks = await banksCRUD.query_banks(db)
        return JSONResponse(
            status_code=200,
            content=jsonable_encoder(banks)
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@banks_router.get("/bank/{bank_id}")
async def get_bank(bank_id: int, db: DB = Depends(get_db)):
    try:
        banks = await banksCRUD.query_bank(db, bank_id)
        return JSONResponse(
            status_code=200,
            content=jsonable_encoder(banks)
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@banks_router.post("/bank")
async def new_bank(bank: banksSchemas.AddBank, db: DB = Depends(get_db)):
    try:
        await banksCRUD.insert_bank(db, bank)
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
async def new_bank(bank: banksSchemas.UpdateBank, db: DB = Depends(get_db)):
    try:
        await banksCRUD.update_bank(db, bank)
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
