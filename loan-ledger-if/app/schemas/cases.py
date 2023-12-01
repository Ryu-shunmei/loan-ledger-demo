from pydantic import BaseModel, model_validator
from typing import Optional


class AddCase(BaseModel):
    head_office_id: Optional[int]
    branch_office_id: Optional[int]
    user_id: Optional[int]
    execute_confirm: Optional[str]
    shbs_report: Optional[str]
    bank_id: Optional[str]
    loan_target: Optional[str]
    ap_loan_applicable: Optional[str]
    excute_date: Optional[str]
    house_code: Optional[str]
    house_name: Optional[str]
    loan_amount: Optional[str]
    deduction_amount: Optional[str]
    deposit_amount: Optional[str]
    heim_note: Optional[str]
    shbs_note: Optional[str]
    shbs_confirm: Optional[str]
    collection_date: Optional[str]
    receive_date: Optional[str]
    registrate_date: Optional[str]
    schedule_date: Optional[str]
    establish_date: Optional[str]
    doc_send_date: Optional[str]
    confirm_date: Optional[str]

    @model_validator(mode="before")
    @classmethod
    def pre_kill_blank(cls, data: dict) -> dict:
        temp = {}
        for k, v in data.items():
            if v == "":
                temp[k] = None
            else:
                temp[k] = v

        return temp


class UpdateCase(BaseModel):
    id: Optional[int]
    head_office_id: Optional[int]
    branch_office_id: Optional[int]
    user_id: Optional[int]
    execute_confirm: Optional[str]
    shbs_report: Optional[str]
    bank_id: Optional[str]
    loan_target: Optional[str]
    ap_loan_applicable: Optional[str]
    excute_date: Optional[str]
    house_code: Optional[str]
    house_name: Optional[str]
    loan_amount: Optional[str]
    deduction_amount: Optional[str]
    deposit_amount: Optional[str]
    heim_note: Optional[str]
    shbs_note: Optional[str]
    shbs_confirm: Optional[str]
    collection_date: Optional[str]
    receive_date: Optional[str]
    registrate_date: Optional[str]
    schedule_date: Optional[str]
    establish_date: Optional[str]
    doc_send_date: Optional[str]
    confirm_date: Optional[str]

    @model_validator(mode="before")
    @classmethod
    def pre_kill_blank(cls, data: dict) -> dict:
        temp = {}
        for k, v in data.items():
            if v == "":
                temp[k] = None
            else:
                temp[k] = v

        return temp
