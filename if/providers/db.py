import typing
import aiomysql
from loguru import logger
from configs.db import db_conf
from configs.app import app_conf


class DB:
    _instance = None

    def __new__(cls, *args, **kw):
        if cls._instance is None:
            cls._instance = object.__new__(cls, *args, **kw)
        return cls._instance
    
    def __init__(self) -> None:
        self._pool = None

    async def connect(self) -> None:
        if self._pool is None:
            self._pool = await aiomysql.create_pool(
                user=db_conf.USER,
                password=db_conf.PASSWORD,
                db=db_conf.NAME,
                host=db_conf.HOST,
                port=db_conf.PORT,
                autocommit=True,
            )

    async def fetch_one(self, sql) -> typing.Optional[aiomysql.DictCursor]:
        if app_conf.DEBUG:
            logger.debug(sql)
        if self._pool is None:
            await self.connect()
        async with self._pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(sql)
                result = await cur.fetchone()
                return result

    async def fetch_all(self, sql) -> typing.List[aiomysql.DictCursor]:
        if app_conf.DEBUG:
            logger.debug(sql)
        if self._pool is None:
            await self.connect()
        async with self._pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(sql)
                result = await cur.fetchall()
                return result

    async def insert(self, sql) -> None:
        if app_conf.DEBUG:
            logger.debug(sql)
        if self._pool is None:
            await self.connect()
        async with self._pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(sql)
                await conn.commit()

    async def update(self, sql) -> None:
        if app_conf.DEBUG:
            logger.debug(sql)
        if self._pool is None:
            await self.connect()
        async with self._pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute(sql)
                await conn.commit()


async def register():
    await DB().connect()