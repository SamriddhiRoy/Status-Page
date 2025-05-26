from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4

router = APIRouter(prefix="/services", tags=["services"])

SERVICE_STATUSES = ["Operational", "Degraded", "Partial Outage", "Major Outage"]
services_db = []

class Service(BaseModel):
    id: str
    name: str
    description: str
    status: str

class CreateService(BaseModel):
    name: str
    description: str
    status: str

@router.get("/", response_model=List[Service])
def get_services():
    return services_db

@router.post("/", response_model=Service)
def create_service(service: CreateService):
    if service.status not in SERVICE_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    new_service = Service(id=str(uuid4()), **service.dict())
    services_db.append(new_service)
    return new_service

@router.put("/{service_id}", response_model=Service)
def update_service(service_id: str, updated: CreateService):
    for service in services_db:
        if service.id == service_id:
            service.name = updated.name
            service.description = updated.description
            service.status = updated.status
            return service
    raise HTTPException(status_code=404, detail="Service not found")

@router.delete("/{service_id}")
def delete_service(service_id: str):
    global services_db
    services_db = [s for s in services_db if s.id != service_id]
    return {"detail": "Deleted"}
