from providers.db import DB
from app.schemas import enums
from app.schemas.users import AddUserPermission, UpdateUserPermission


async def query_user_with_email(db: DB, email: str):
    sql = f"""
    SELECT
        id
    FROM
        users
    WHERE
        users.email = '{email}';
    """
    return await db.fetch_one(sql)


async def query_user_for_token(db: DB, email: str):
    sql = f"""
    SELECT
        users.id,
        users.name,
        users.email,
        users.phone_num,
        users.head_office_id,
        users.branch_office_id,
        users.category,
        users.status,
        users.password,
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
        roles.id = permissions.role_id
    WHERE
        users.email = '{email}';
    """
    return await db.fetch_one(sql)


async def query_user_with_id(db: DB, id: int):
    sql = f"""
    SELECT
        users.id,
        users.name,
        users.sex,
        users.email,
        users.phone_num,
        users.head_office_id,
        users.branch_office_id,
        users.category,
        users.status,
        users.password,
        roles.id as role_id,
        roles.alias,
        permissions.id as permission_id,
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
        roles.id = permissions.role_id
    WHERE
        users.id = {id};
    """
    return await db.fetch_one(sql)


async def insert_system_user(db: DB, name: str, email: str, hashed_pwd: str):
    sql = f"""
    INSERT INTO USERS (name, email, password, category, status)
    VALUES ('{name}', '{email}', '{hashed_pwd}', '{enums.UserCategory.system_user.value}', '{enums.UserStatus.regular.value}');
    """
    await db.insert(sql)


async def query_users_for_head(db: DB):
    sql = f"""
    SELECT
        users.id,
        users.name,
        users.sex,
        users.email,
        users.phone_num,
        users.head_office_id,
        users.branch_office_id,
        users.category,
        users.status,
        head_offices.name as head_office_name,
        branch_offices.name as branch_office_name
    FROM
        users
    LEFT JOIN head_offices
        ON users.head_office_id = head_offices.id
    LEFT JOIN branch_offices
        ON users.branch_office_id = branch_offices.id;
    """
    return await db.fetch_all(sql)


async def query_users_for_branch(db: DB, branch_id: int):
    sql = f"""
    SELECT
        users.id,
        users.name,
        users.sex,
        users.email,
        users.phone_num,
        users.head_office_id,
        users.branch_office_id,
        users.category,
        users.status,
        head_offices.name as head_office_name,
        branch_offices.name as branch_office_name
    FROM
        users
    LEFT JOIN head_offices
        ON users.head_office_id = head_offices.id
    LEFT JOIN branch_offices
        ON users.branch_office_id = branch_offices.id
    WHERE
        users.branch_office_id = {branch_id};
    """
    return await db.fetch_all(sql)


async def query_users_with_category(db: DB, category: str):
    sql = f"""
    SELECT
        id,
        name
    FROM
        users
    WHERE
        users.category = '{category}';
    """
    return await db.fetch_all(sql)


async def query_heads(db: DB):
    sql = f"""
    SELECT
        id,
        name
    FROM
        head_offices
    """
    return await db.fetch_all(sql)


async def query_branchs(db: DB):
    sql = f"""
    SELECT
        id,
        name
    FROM
        head_branchs
    """
    return await db.fetch_all(sql)


async def insert_new_user(db: DB, user_p: AddUserPermission, password: str):
    sql = f"""
    INSERT INTO users
        (
            name,
            sex,
            email,
            phone_num,
            password,
            head_office_id,
            branch_office_id,
            category,
            status
        )
    VALUES
        (
            '{user_p.name}',
            '{user_p.sex}',
            '{user_p.email}',
            '{user_p.phone_num}',
            '{password}',
            {user_p.head_office_id},
            {user_p.branch_office_id},
            '{user_p.category}',
            '01'
        );
    
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)
    new_user = await db.fetch_one("SELECT LAST_INSERT_ID() as id;")
    sql = f"""
    INSERT INTO roles (user_id, alias)
    VALUES ({new_user["id"]}, '{user_p.alias}')
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)
    new_role = await db.fetch_one("SELECT LAST_INSERT_ID() as id;")
    sql = f"""
    INSERT INTO permissions
        (
            role_id,
            menu_home,
            menu_users,
            menu_branchs,
            menu_banks,
            action_create_bank,
            action_update_bank,
            action_create_branch,
            action_update_branch,
            action_create_user,
            action_update_user,
            action_create_case,
            action_update_case,
            action_import_case,
            action_export_case
        )
    VALUES
        (
            {new_role["id"]},
            {user_p.menu_home},
            {user_p.menu_users},
            {user_p.menu_branchs},
            {user_p.menu_banks},
            {user_p.action_create_bank},
            {user_p.action_update_bank},
            {user_p.action_create_branch},
            {user_p.action_update_branch},
            {user_p.action_create_user},
            {user_p.action_update_user},
            {user_p.action_create_case},
            {user_p.action_update_case},
            {user_p.action_import_case},
            {user_p.action_export_case}
        )
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)


async def update_user(db: DB, user_p: UpdateUserPermission):
    sql = f"""
    UPDATE
        users
    SET
        name = '{user_p.name}',
        sex = '{user_p.sex}',
        email = '{user_p.email}',
        phone_num = '{user_p.phone_num}',
        head_office_id = {user_p.head_office_id},
        branch_office_id = {user_p.branch_office_id},
        category = '{user_p.category}'
    WHERE
        users.id = {user_p.id};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.update(sql)

    sql = f"""
    UPDATE
        permissions
    SET
        menu_home = {user_p.menu_home},
        menu_users = {user_p.menu_users},
        menu_branchs = {user_p.menu_branchs},
        menu_banks = {user_p.menu_banks},
        action_create_bank = {user_p.action_create_bank},
        action_update_bank = {user_p.action_update_bank},
        action_create_branch = {user_p.action_create_branch},
        action_update_branch = {user_p.action_update_branch},
        action_create_user = {user_p.action_create_user},
        action_update_user = {user_p.action_update_user},
        action_create_case = {user_p.action_create_case},
        action_update_case = {user_p.action_update_case},
        action_import_case = {user_p.action_import_case},
        action_export_case = {user_p.action_export_case}
    WHERE
        permissions.id = {user_p.permission_id};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")

    await db.update(sql)
