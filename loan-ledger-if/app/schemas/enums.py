from enum import Enum


class UserCategory(Enum):
    head_office_user = "01"
    branch_office_user = "02"
    business_user = "03"
    system_user = "99"


class UserStatus(Enum):
    new = "01"
    regular = "02"
    start = "99"
