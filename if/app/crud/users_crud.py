from providers.db import DB


async def query_users_for_category_01(db: DB):
    user_list = []
    sql = f"""
    SELECT
        id,
        first_name,
        last_name,
        sex,
        email,
        status
    FROM
        users
    """
    basic_user_list = await db.fetch_all(sql)
    for basic_use in basic_user_list:
        sql = f"""
        SELECT
            id,
            name
        FROM
            roles
        WHERE
            roles.user_id = {basic_use["id"]}
        """
        roles = await db.fetch_all(sql)
        user_list.append({
            **basic_use,
            "roles": roles
        })

    return user_list


async def query_target_users(db: DB, id: int):
    sql = f"""
    SELECT
        id,
        first_name,
        last_name
    FROM
        users
    WHERE
        users.id != {id};
    """
    return await db.fetch_all(sql)


async def query_users_for_category_02(db: DB, branch_office_id: int):
    user_list = []
    sql = f"""
    SELECT
        id,
        first_name,
        last_name,
        sex,
        email,
        status
    FROM
        users;
    """
    basic_user_list = await db.fetch_all(sql)
    for basic_use in basic_user_list:
        sql = f"""
        SELECT
            id,
            name
        FROM
            roles
        WHERE
            roles.user_id = {basic_use["id"]}
            AND
            roles.branch_office_id = {branch_office_id};
        """
        roles = await db.fetch_all(sql)
        if len(roles) > 0:
            user_list.append({
                **basic_use,
                "roles": roles
            })

    return user_list


async def insert_new_user(db: DB, user_data: dict, password: str = "12345678"):
    sql = f"""
    INSERT INTO users
        (
            last_name,
            first_name,
            sex,
            email,
            password,
            status
        )
    VALUES
        (
            '{user_data["last_name"]}',
            '{user_data["first_name"]}',
            '{user_data["sex"]}',
            '{user_data["email"]}',
            '{password}',
            '02'
        );
    
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)


async def update_user(db: DB, user_data: dict, password: str = "12345678"):
    sql = f"""
    UPDATE users
    SET
        last_name='{user_data["last_name"]}',
        first_name='{user_data["first_name"]}',
        sex='{user_data["sex"]}',
        email='{user_data["email"]}'
    WHERE
        users.id = {user_data["id"]};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)


async def query_user(db: DB, id: int):
    sql = f"""
    SELECT
        id,
        first_name,
        last_name,
        sex,
        email,
        status
    FROM
        users
    WHERE
        users.id = {id};
    """
    return await db.fetch_one(sql)


async def insert_role(db: DB, role_data: dict, user_id: int):
    sql = f"""
    INSERT INTO permissions
        (
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
            {role_data["menu_home"]},
            {role_data["menu_users"]},
            {role_data["menu_branchs"]},
            {role_data["menu_banks"]},
            {role_data["action_create_bank"]},
            {role_data["action_update_bank"]},
            {role_data["action_create_branch"]},
            {role_data["action_update_branch"]},
            {role_data["action_create_user"]},
            {role_data["action_update_user"]},
            {role_data["action_create_case"]},
            {role_data["action_update_case"]},
            {role_data["action_import_case"]},
            {role_data["action_export_case"]}
        )
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)
    permission = await db.fetch_one("SELECT LAST_INSERT_ID() as id;")
    sql = f"""
    INSERT INTO roles
        (
            name,
            user_id,
            permission_id,
            category,
            branch_office_id
        )
    VALUES
        (
            '{role_data["name"]}',
            {user_id},
            {permission["id"]},
            '{role_data["category"]}',
            {role_data["branch_office_id"]}
        );
    """

    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)
    role = await db.fetch_one("SELECT LAST_INSERT_ID() as id;")
    if role_data["branch_office_id"] is not None and role_data["category"] in ["99", "01", "02"]:

        sql = f"""
        UPDATE branch_offices
        SET
            role_id = {role["id"]}
        WHERE
            branch_offices.id = {role_data["branch_office_id"]};
        """
        await db.update(sql)


async def query_role(db: DB, role_id):
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
        permissions.action_export_case,
        roles.name,
        roles.id,
        roles.permission_id,
        roles.category,
        roles.branch_office_id
    FROM
        roles
    LEFT JOIN
        permissions
        ON roles.permission_id = permissions.id
    WHERE
        roles.id = {role_id};
    """
    return await db.fetch_one(sql)


async def update_role(db: DB, role_data: dict):
    sql = f"""
    UPDATE roles
    SET 
        name = '{role_data["name"]}',
        category = '{role_data["category"]}',
        branch_office_id = {role_data["branch_office_id"]}
    WHERE
        roles.id = {role_data["id"]};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)
    sql = f"""
    UPDATE permissions
    SET 
        menu_home = {role_data["menu_home"]},
        menu_users = {role_data["menu_users"]},
        menu_branchs = {role_data["menu_branchs"]},
        menu_banks = {role_data["menu_banks"]},
        action_create_bank = {role_data["action_create_bank"]},
        action_update_bank = {role_data["action_update_bank"]},
        action_create_branch = {role_data["action_create_branch"]},
        action_update_branch = {role_data["action_update_branch"]},
        action_create_user = {role_data["action_create_user"]},
        action_update_user = {role_data["action_update_user"]},
        action_create_case = {role_data["action_create_case"]},
        action_update_case = {role_data["action_update_case"]},
        action_import_case = {role_data["action_import_case"]},
        action_export_case = {role_data["action_export_case"]}
    WHERE
        permissions.id = {role_data["permission_id"]};
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)
    if role_data["branch_office_id"] is not None and role_data["category"] in ["99", "01", "02"]:
        sql = f"""
        UPDATE branch_offices
        SET
            role_id = {role_data["id"]}
        WHERE
            branch_offices.id = {role_data["branch_office_id"]};
        """
        await db.update(sql)


async def switch_role(db: DB, user_id: int, role_id: int):
    sql = f"""
    UPDATE roles
    SET
        user_id = {user_id}
    WHERE
        roles.id = {role_id};
    """
    await db.update(sql)


async def query_managers(db: DB):
    sql = f"""
    SELECT
        users.id,
        users.last_name,
        users.first_name,
        roles.id as role_id
    FROM
        users
    JOIN
        roles
        ON
        roles.user_id = users.id
    WHERE
        roles.category = '02'
        or
        roles.category = '01'
        or
        roles.category = '99';
    """
    for_branch = await db.fetch_all(sql)
    sql = f"""
    SELECT
        users.id,
        users.last_name,
        users.first_name,
        roles.id as role_id
    FROM
        users
    JOIN
        roles
        ON
        roles.user_id = users.id
    WHERE
        roles.category = '01'
        or
        roles.category = '99';
    """
    for_head = await db.fetch_all(sql)

    return {"for_branch": for_branch, "for_head": for_head}
