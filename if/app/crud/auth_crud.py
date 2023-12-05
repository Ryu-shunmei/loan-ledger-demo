from providers.db import DB


async def check_user_is_exist(db: DB, email: str):
    sql = f"""
    SELECT
        id,
        password
    FROM
        users
    WHERE
        users.email = '{email}';
    """
    return await db.fetch_one(sql)


async def query_token_payload(db: DB, id: int):
    payload = {}
    sql = f"""
    SELECT
        users.id,
        users.first_name,
        users.last_name,
        users.sex,
        users.email,
        users.curr_role_id,
        users.status,
        roles.branch_office_id,
        roles.category
    FROM
        users
    LEFT JOIN roles
        ON users.curr_role_id = roles.id
    WHERE
        users.id = {id};
    """
    basic_user = await db.fetch_one(sql)
    sql = f"""
    SELECT
        id,
        name
    FROM
        roles
    WHERE
        roles.user_id = {id}
    """
    roles = await db.fetch_all(sql)
    sql = f"""
    SELECT
        permissions.menu_home,
        permissions.menu_users,
        permissions.menu_branchs,
        permissions.menu_banks,
        permissions.action_create_bank,
        permissions.action_update_bank,
        permissions.action_create_branch,
        permissions.action_update_branch,
        permissions.action_create_user,
        permissions.action_update_user,
        permissions.action_create_case,
        permissions.action_update_case,
        permissions.action_import_case,
        permissions.action_export_case
    FROM
        users
    LEFT JOIN 
        roles
        ON
        users.id = roles.user_id
    LEFT JOIN
        permissions
        ON
        roles.permission_id = permissions.id
    WHERE
        users.id = {id}
        AND
        roles.id = {basic_user["curr_role_id"]};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    permissions = await db.fetch_one(sql)

    return {**basic_user, "roles": roles, "permissions": permissions}


async def update_user_curr_role_id(db: DB, user_id: int, role_id: int):
    sql = f"""
    UPDATE users
    SET curr_role_id = {role_id}
    WHERE
        users.id = {user_id}
    """
    await db.update(sql)
