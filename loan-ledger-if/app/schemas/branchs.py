from pydantic import BaseModel, model_validator
from typing import Optional


class AddBranch(BaseModel):
    name: Optional[str]
    office_phone_number: Optional[str]
    postal_code: Optional[str]
    prefecture: Optional[str]
    city: Optional[str]
    district: Optional[str]
    other_address: Optional[str]
    belong_user_id: Optional[str]

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


class UpdateBranch(BaseModel):
    id: int
    name: Optional[str]
    office_phone_number: Optional[str]
    postal_code: Optional[str]
    prefecture: Optional[str]
    city: Optional[str]
    district: Optional[str]
    other_address: Optional[str]
    belong_user_id: Optional[str]

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
