from providers.db import DB


async def query_branchs(db: DB):
    sql = f"""
    SELECT
        branch_offices.id,
        branch_offices.name,
        branch_offices.role_id,
        branch_offices.belong_role_id,
        usersa.first_name as first_name,
        usersa.last_name as last_name,
        usersb.first_name as belong_first_name,
        usersb.last_name as belong_last_name
    FROM
        branch_offices
    LEFT JOIN roles as rolesa
        ON rolesa.id = branch_offices.role_id
    LEFT JOIN users as usersa
        ON usersa.id = rolesa.user_id
    LEFT JOIN roles as rolesb
        ON rolesb.id = branch_offices.belong_role_id
    LEFT JOIN users as usersb
        ON usersb.id = rolesb.user_id;
    """
    return await db.fetch_all(sql)


async def insert_branch(db: DB, branch_data: dict):
    sql = f"""
    INSERT INTO branch_offices
    (name, role_id, belong_role_id)
    VALUES
    ('{branch_data["name"]}', {branch_data["role_id"]}, {branch_data["belong_role_id"]} );
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.insert(sql)


async def query_branch(db: DB, branch_id: int):
    sql = f"""
    SELECT
        id,
        role_id,
        name,
        belong_role_id
    FROM
        branch_offices
    WHERE
        branch_offices.id = {branch_id};
    """
    return await db.fetch_one(sql)


async def update_branch(db: DB, branch: dict):
    sql = f"""
    UPDATE
        branch_offices
    SET
        name = '{branch["name"]}',
        role_id = {branch["role_id"]},
        belong_role_id = {branch["belong_role_id"]}
    WHERE
        branch_offices.id = {branch["id"]};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.update(sql)
