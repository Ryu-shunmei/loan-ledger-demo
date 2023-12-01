from pydantic import BaseModel, Field, model_validator
from .enums import UserCategory
from typing import Optional


class UserBasic(BaseModel):
    email: str = Field(None, max_length=255,
                       pattern="^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$")
    # category: UserCategory


class UserAuth(UserBasic):
    password: str = Field(None, max_length=32)


class UserAdd(UserBasic):
    name: str = Field(None, max_length=128)
    password: str = Field(None, max_length=32)


class AddUserPermission(BaseModel):
    name: Optional[str]
    sex: Optional[str]
    email: Optional[str]
    password: Optional[str]
    category: Optional[str]
    phone_num: Optional[str]
    head_office_id: Optional[int]
    branch_office_id: Optional[int]
    alias: Optional[str]

    menu_home: Optional[int]
    menu_users: Optional[int]
    menu_branchs: Optional[int]
    menu_banks: Optional[int]
    action_create_bank: Optional[int]
    action_update_bank: Optional[int]
    action_create_branch: Optional[int]
    action_update_branch: Optional[int]
    action_create_user: Optional[int]
    action_update_user: Optional[int]
    action_create_case: Optional[int]
    action_update_case: Optional[int]
    action_import_case: Optional[int]
    action_export_case: Optional[int]

    @model_validator(mode="before")
    @classmethod
    def pre_kill_blank(cls, data: dict) -> dict:
        temp = {}
        for k, v in data.items():
            if v == "":
                temp[k] = None
            elif v == True:
                temp[k] = 1
            elif v == False:
                temp[k] = None
            else:
                temp[k] = v

        return temp


class UpdateUserPermission(BaseModel):
    id: Optional[int]
    role_id: Optional[int]
    permission_id: Optional[int]
    name: Optional[str]
    sex: Optional[str]
    email: Optional[str]
    category: Optional[str]
    phone_num: Optional[str]
    head_office_id: Optional[int]
    branch_office_id: Optional[int]
    alias: Optional[str]

    menu_home: Optional[int]
    menu_users: Optional[int]
    menu_branchs: Optional[int]
    menu_banks: Optional[int]
    action_create_bank: Optional[int]
    action_update_bank: Optional[int]
    action_create_branch: Optional[int]
    action_update_branch: Optional[int]
    action_create_user: Optional[int]
    action_update_user: Optional[int]
    action_create_case: Optional[int]
    action_update_case: Optional[int]
    action_import_case: Optional[int]
    action_export_case: Optional[int]

    @model_validator(mode="before")
    @classmethod
    def pre_kill_blank(cls, data: dict) -> dict:
        temp = {}
        for k, v in data.items():
            if v == "":
                temp[k] = None
            elif v == True:
                temp[k] = 1
            elif v == False:
                temp[k] = None
            else:
                temp[k] = v

        return temp
