from fastapi import FastAPI, Response
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

# ✅ Add these two routes:
@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return Response(content='{"message": "Welcome to the Status Page API"}', media_type="application/json")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

# Register routers
app.include_router(auth.router)                
app.include_router(services.router)            
app.include_router(incident_router)            
app.include_router(organization_router)        
