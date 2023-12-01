from providers.db import DB
from app.schemas.branchs import AddBranch, UpdateBranch


async def query_branchs(db: DB):
    sql = f"""
    SELECT
        branch_offices.id,
        branch_offices.head_office_id,
        branch_offices.name,
        branch_offices.office_phone_number,
        branch_offices.postal_code,
        branch_offices.prefecture,
        branch_offices.city,
        branch_offices.district,
        branch_offices.other_address,
        branch_offices.belong_user_id,
        users.name as belong_user_name
    FROM
        branch_offices
    LEFT JOIN users
        ON users.id = branch_offices.belong_user_id;
    """
    return await db.fetch_all(sql)


async def insert_branch(db: DB, branch: AddBranch, head_office_id: int):
    sql = f"""
    INSERT INTO branch_offices
    (head_office_id, name, office_phone_number, postal_code, prefecture, city, district, other_address, belong_user_id)
    VALUES
    ({head_office_id}, '{branch.name}', '{branch.office_phone_number}', '{branch.postal_code}', '{branch.prefecture}', '{branch.city}', '{branch.district}', '{branch.other_address}', '{branch.belong_user_id}');
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.insert(sql)


async def query_branch(db: DB, branch_id: int):
    sql = f"""
    SELECT
        id,
        head_office_id,
        name,
        office_phone_number,
        postal_code,
        prefecture,
        city,
        district,
        other_address,
        belong_user_id
    FROM
        branch_offices
    WHERE
        branch_offices.id = {branch_id};
    """
    return await db.fetch_one(sql)


async def update_branch(db: DB, branch: UpdateBranch, head_office_id: int):
    sql = f"""
    UPDATE
        branch_offices
    SET
        id = {branch.id},
        head_office_id = {head_office_id},
        name = '{branch.name}',
        office_phone_number = '{branch.office_phone_number}',
        postal_code = '{branch.postal_code}',
        prefecture = '{branch.prefecture}',
        city = '{branch.city}',
        district = '{branch.district}',
        other_address = '{branch.other_address}',
        belong_user_id = {branch.belong_user_id}
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.update(sql)
