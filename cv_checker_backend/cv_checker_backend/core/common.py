from typing import Literal, TypedDict

class StatusType(TypedDict):
    ERROR: Literal[0]
    SUCCESS: Literal[1]
    NOT_AUTHORIZED: Literal[2]
    NOT_FOUND: Literal[3]
    INTERNAL_SERVER_ERROR: Literal[4]
    BAD_REQUEST: Literal[5]

STATUS: StatusType = {
    "ERROR": 0,
    "SUCCESS": 1,
    "NOT_AUTHORIZED": 2,
    "NOT_FOUND": 3,
    "INTERNAL_SERVER_ERROR": 4,
    "BAD_REQUEST": 5
}