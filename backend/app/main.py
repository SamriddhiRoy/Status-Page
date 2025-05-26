from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, services
from app.incident import router as incident_router
from app.organization import router as organization_router  # ✅ Added

app = FastAPI()

# CORS middleware
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/auth", tags=["auth"])

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

# Include routers
app.include_router(auth.router)
app.include_router(services.router)
app.include_router(incident_router)
app.include_router(organization_router)  # ✅ Added

