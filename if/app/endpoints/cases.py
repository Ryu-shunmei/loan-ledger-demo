from loguru import logger
from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from app.dependencies import get_db, DB
from app.dependencies import get_user_info

from app.crud import cases_crud


cases_router = APIRouter()


@cases_router.get("/cases")
async def get_cases(db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        cases = None
        print(999, user_info)
        if user_info["category"] in ["01", "99"]:
            cases = await cases_crud.query_cases_category_01(db)
        if user_info["category"] == "02":
            cases = await cases_crud.query_cases_for_branch(db, user_info["branch_office_id"])
        if user_info["category"] == "03":
            cases = await cases_crud.query_cases_for_branch(db, user_info["curr_role_id"])
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
async def new_user(case_info: dict, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        case_info_kill = {}
        for k, v in case_info.items():
            if v == "":
                case_info_kill[k] = None
            elif v == True:
                case_info_kill[k] = 1
            elif v == False:
                case_info_kill[k] = None
            else:
                case_info_kill[k] = v
        await cases_crud.insert_case(db, case_info_kill)
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


@cases_router.get("/case")
async def get_cases(id: int, db: DB = Depends(get_db), user_info: dict = Depends(get_user_info)):
    try:
        cases = await cases_crud.query_cases_with_id(db, id)
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


@cases_router.put("/case")
async def update_user(case_info: dict, db: DB = Depends(get_db)):
    try:
        case_info_kill = {}
        for k, v in case_info.items():
            if v == "":
                case_info_kill[k] = None
            elif v == True:
                case_info_kill[k] = 1
            elif v == False:
                case_info_kill[k] = None
            else:
                case_info_kill[k] = v
        await cases_crud.update_case(db, case_info_kill)
        return JSONResponse(
            status_code=200,
            content={"message": "ok"},
        )
    except Exception as err:
        logger.exception(err)
        return JSONResponse(
            status_code=500,
            content={"message": "サーバー側にエラーが発生しました。"},
        )
