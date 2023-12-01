from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from app.crud import cases as casesCRUD
from app.schemas import cases as casesSchemas

cases_router = APIRouter()


@cases_router.get("/cases")
async def get_cases(db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        cases = None
        if user_info["category"] == "01":
            cases = await casesCRUD.query_cases_for_head(db)
        if user_info["category"] == "02":
            cases = await casesCRUD.query_cases_for_branch(db, user_info["branch_office_id"])
        if user_info["category"] == "03":
            cases = await casesCRUD.query_cases_for_branch(db, user_info["id"])
        return JSONResponse(
            status_code=200,
            content=jsonable_encoder(cases)
        )

    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@cases_router.post("/case")
async def new_user(case_info: casesSchemas.AddCase, db: DB = Depends(get_db)):
    try:
        await casesCRUD.insert_case(db, case_info)
        return JSONResponse(
            status_code=200,
            content="created!"
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@cases_router.put("/case")
async def update_user(case_info: casesSchemas.UpdateCase, db: DB = Depends(get_db)):
    try:
        await casesCRUD.update_case(db, case_info)
        return JSONResponse(
            status_code=200,
            content="updated!"
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )


@cases_router.get("/case/{case_id}")
async def new_user(case_id: int, db: DB = Depends(get_db)):
    try:
        case = await casesCRUD.query_case_with_id(db, case_id)
        return JSONResponse(
            status_code=200,
            content=jsonable_encoder(case)
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
