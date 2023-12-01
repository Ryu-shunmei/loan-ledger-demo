from loguru import logger
from fastapi import Header
from fastapi import HTTPException

from jose import jwt
from configs.auth import auth_conf
from providers.db import DB


async def get_db() -> DB:
    db = DB()
    return db


def get_user_info(authorization: str = Header()):
    try:
        [type_, token] = authorization.split(" ")
        payload = jwt.decode(
            token=token,
            key=auth_conf.SECRETS_KEY,
            algorithms=[auth_conf.ALGORITHM],
        )
        return payload
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=401)
