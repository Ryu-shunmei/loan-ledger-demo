from pydantic import BaseModel, model_validator
from typing import Optional


class AddBank(BaseModel):
    type: Optional[str]
    bank_name: Optional[str]

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


class UpdateBank(BaseModel):
    id: Optional[int]
    type: Optional[str]
    bank_name: Optional[str]

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
