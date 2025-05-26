from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, services
from app.incident import router as incident_router
from app.organization import router as organization_router

app = FastAPI()

# CORS
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

# Register routers
app.include_router(auth.router)                # ✅ Login and auth routes
app.include_router(services.router)            # ✅ Services CRUD
app.include_router(incident_router)            # ✅ Incidents
app.include_router(organization_router)        # ✅ Organizations
