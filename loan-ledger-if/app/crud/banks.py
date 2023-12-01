from providers.db import DB
from app.schemas.banks import AddBank, UpdateBank


async def query_banks(db: DB):
    sql = """
    SELECT
        id,
        type,
        bank_name,
        created_at,
        updated_at
    FROM
        bank_master
    """
    return await db.fetch_all(sql)


async def insert_bank(db: DB, bank: AddBank):
    sql = f"""
    INSERT INTO bank_master
    (type, bank_name)
    VALUES
    ('{bank.type}', '{bank.bank_name}');
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.insert(sql)


async def query_bank(db: DB, bank_id: int):
    sql = f"""
    SELECT
        id,
        type,
        bank_name
    FROM
        bank_master
    WHERE
        bank_master.id = {bank_id};
    """
    return await db.fetch_one(sql)


async def update_bank(db: DB, bank: UpdateBank):
    sql = f"""
    UPDATE
        bank_master
    SET
        type = '{bank.type}',
        bank_name = '{bank.bank_name}'
    WHERE
        bank_master.id = {bank.id};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.update(sql)
