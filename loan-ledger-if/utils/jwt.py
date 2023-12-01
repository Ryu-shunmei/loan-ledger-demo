from jose import jwt
from datetime import datetime, timedelta
from configs.auth import auth_conf


def gen_access_token(
    payload: dict, expires_delta: int = auth_conf.ACCESS_TOKEN_EXP_HOURS
) -> str:
    exp = datetime.utcnow() + timedelta(hours=expires_delta)
    return jwt.encode(
        claims={**payload, "exp": exp},
        key=auth_conf.SECRETS_KEY,
        algorithm=auth_conf.ALGORITHM,
        headers={"alg": auth_conf.ALGORITHM, "type": "JWT"},
    )
