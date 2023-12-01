from providers.db import DB
from app.schemas.cases import AddCase, UpdateCase


async def query_cases_for_head(db: DB):
    sql = """
    SELECT
        cases.id,
        cases.head_office_id,
        cases.branch_office_id,
        cases.user_id,
        cases.execute_confirm,
        cases.shbs_report,
        cases.bank_id,
        cases.loan_target,
        cases.ap_loan_applicable,
        cases.excute_date,
        cases.house_code,
        cases.house_name,
        cases.loan_amount,
        cases.deduction_amount,
        cases.deposit_amount,
        cases.heim_note,
        cases.shbs_note,
        cases.shbs_confirm,
        cases.collection_date,
        cases.receive_date,
        cases.registrate_date,
        cases.schedule_date,
        cases.establish_date,
        cases.doc_send_date,
        cases.confirm_date,
        users.name as user_name,
        branch_offices.name as branch_office_name,
        bank_master.bank_name,
        bank_master.type
    FROM
        cases
    LEFT JOIN
        users
        ON
        users.id = cases.user_id
    LEFT JOIN
        branch_offices
        ON
        branch_offices.id = cases.branch_office_id
    LEFT JOIN
        bank_master
        ON
        bank_master.id = cases.bank_id;
    """

    return await db.fetch_all(sql)


async def query_cases_for_branch(db: DB, branch_id):
    sql = f"""
    SELECT
        cases.id,
        cases.head_office_id,
        cases.branch_office_id,
        cases.user_id,
        cases.execute_confirm,
        cases.shbs_report,
        cases.bank_id,
        cases.loan_target,
        cases.ap_loan_applicable,
        cases.excute_date,
        cases.house_code,
        cases.house_name,
        cases.loan_amount,
        cases.deduction_amount,
        cases.deposit_amount,
        cases.heim_note,
        cases.shbs_note,
        cases.shbs_confirm,
        cases.collection_date,
        cases.receive_date,
        cases.registrate_date,
        cases.schedule_date,
        cases.establish_date,
        cases.doc_send_date,
        cases.confirm_date,
        users.name as user_name,
        branch_offices.name as branch_office_name,
        bank_master.bank_name,
        bank_master.type
    FROM
        cases
    LEFT JOIN
        users
        ON
        users.id = cases.user_id
    LEFT JOIN
        branch_offices
        ON
        branch_offices.id = cases.branch_office_id
    LEFT JOIN
        bank_master
        ON
        bank_master.id = cases.bank_id
    WHRERE
        cases.branch_office_id = {branch_id};
    """

    return await db.fetch_all(sql)


async def query_cases_for_business(db: DB, user_id):
    sql = f"""
    SELECT
        cases.id,
        cases.head_office_id,
        cases.branch_office_id,
        cases.user_id,
        cases.execute_confirm,
        cases.shbs_report,
        cases.bank_id,
        cases.loan_target,
        cases.ap_loan_applicable,
        cases.excute_date,
        cases.house_code,
        cases.house_name,
        cases.loan_amount,
        cases.deduction_amount,
        cases.deposit_amount,
        cases.heim_note,
        cases.shbs_note,
        cases.shbs_confirm,
        cases.collection_date,
        cases.receive_date,
        cases.registrate_date,
        cases.schedule_date,
        cases.establish_date,
        cases.doc_send_date,
        cases.confirm_date,
        users.name as user_name,
        branch_offices.name as branch_office_name,
        bank_master.bank_name,
        bank_master.type
    FROM
        cases
    LEFT JOIN
        users
        ON
        users.id = cases.user_id
    LEFT JOIN
        branch_offices
        ON
        branch_offices.id = cases.branch_office_id
    LEFT JOIN
        bank_master
        ON
        bank_master.id = cases.bank_id
    WHRERE
        cases.user_id = {user_id};
    """

    return await db.fetch_all(sql)


async def insert_case(db: DB, case_info: AddCase):
    sql = f"""
    INSERT INTO cases
        (
            head_office_id,
            branch_office_id,
            user_id,
            execute_confirm,
            shbs_report,
            bank_id,
            loan_target,
            ap_loan_applicable,
            excute_date,
            house_code,
            house_name,
            loan_amount,
            deduction_amount,
            deposit_amount,
            heim_note,
            shbs_note,
            shbs_confirm,
            collection_date,
            receive_date,
            registrate_date,
            schedule_date,
            establish_date,
            doc_send_date,
            confirm_date
        )
    VALUES
        (
            {case_info.head_office_id},
            {case_info.branch_office_id},
            {case_info.user_id},
            '{case_info.execute_confirm}',
            '{case_info.shbs_report}',
            {case_info.bank_id},
            '{case_info.loan_target}',
            '{case_info.ap_loan_applicable}',
            '{case_info.excute_date}',
            '{case_info.house_code}',
            '{case_info.house_name}',
            {case_info.loan_amount},
            {case_info.deduction_amount},
            {case_info.deposit_amount},
            '{case_info.heim_note}',
            '{case_info.shbs_note}',
            '{case_info.shbs_confirm}',
            '{case_info.collection_date}',
            '{case_info.receive_date}',
            '{case_info.registrate_date}',
            '{case_info.schedule_date}',
            '{case_info.establish_date}',
            '{case_info.doc_send_date}',
            '{case_info.confirm_date}'
        );
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.insert(sql)


async def query_case_with_id(db: DB, case_id: int):
    sql = f"""
    SELECT
        id,
        head_office_id,
        branch_office_id,
        user_id,
        execute_confirm,
        shbs_report,
        bank_id,
        loan_target,
        ap_loan_applicable,
        excute_date,
        house_code,
        house_name,
        loan_amount,
        deduction_amount,
        deposit_amount,
        heim_note,
        shbs_note,
        shbs_confirm,
        collection_date,
        receive_date,
        registrate_date,
        schedule_date,
        establish_date,
        doc_send_date,
        confirm_date
    FROM
        cases
    WHERE
        cases.id = {case_id};
    """

    return await db.fetch_one(sql)


async def update_case(db: DB, case_info: UpdateCase):
    sql = f"""
    UPDATE 
        cases
    SET
        head_office_id = {case_info.head_office_id},
        branch_office_id = {case_info.branch_office_id},
        user_id = {case_info.user_id},
        execute_confirm = '{case_info.execute_confirm}',
        shbs_report = '{case_info.shbs_report}',
        bank_id = {case_info.bank_id},
        loan_target = '{case_info.loan_target}',
        ap_loan_applicable = '{case_info.ap_loan_applicable}',
        excute_date = '{case_info.excute_date}',
        house_code = '{case_info.house_code}',
        house_name = '{case_info.house_name}',
        loan_amount = {case_info.loan_amount},
        deduction_amount = {case_info.deduction_amount},
        deposit_amount = {case_info.deposit_amount},
        heim_note = '{case_info.heim_note}',
        shbs_note = '{case_info.shbs_note}',
        shbs_confirm = '{case_info.shbs_confirm}',
        collection_date = '{case_info.collection_date}',
        receive_date = '{case_info.receive_date}',
        registrate_date = '{case_info.registrate_date}',
        schedule_date = '{case_info.schedule_date}',
        establish_date = '{case_info.establish_date}',
        doc_send_date = '{case_info.doc_send_date}',
        confirm_date = '{case_info.confirm_date}'
    WHERE
        cases.id = {case_info.id}
    """
    sql = sql.replace("'None'", "null").replace("None", "null")
    await db.update(sql)
