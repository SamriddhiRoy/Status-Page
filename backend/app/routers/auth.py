from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

# Dummy user
DUMMY_USER = {
    "email": "admin@example.com",
    "password": "admin123",
    "token": "fake-jwt-token"
}

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    token: str

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest):
    if request.email == DUMMY_USER["email"] and request.password == DUMMY_USER["password"]:
        return {"token": DUMMY_USER["token"]}
    raise HTTPException(status_code=401, detail="Invalid credentials")
