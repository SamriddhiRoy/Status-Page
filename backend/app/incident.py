from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4
from datetime import datetime, timedelta

router = APIRouter(prefix="/incidents", tags=["incidents"])

# Dummy service name map
SERVICES_MAP = {
    "svc1": "Login API",
    "svc2": "Database",
    "svc3": "Payment Gateway",
    "svc4": "Frontend App",
}

# In-memory storage
INCIDENTS = []

# Base model used for creation
class IncidentBase(BaseModel):
    title: str
    description: str
    services: List[str]  # service IDs like svc1, svc2
    type: str  # 'incident' or 'maintenance'
    status: str  # 'investigating', 'identified', etc.
    email: str  # email of the person to notify

# Full incident object stored in memory
class Incident(IncidentBase):
    id: str
    created_at: datetime

# Model for partial update
class PartialIncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    services: Optional[List[str]] = None
    type: Optional[str] = None
    status: Optional[str] = None
    email: Optional[str] = None

# Model for status-only update
class IncidentStatusUpdate(BaseModel):
    status: str
    update_message: str
    timestamp: datetime = datetime.utcnow()

# Model for enriched response (with resolved service names)
class IncidentResponse(BaseModel):
    id: str
    title: str
    description: str
    services: List[str]  # resolved names
    type: str
    status: str
    email: str
    created_at: datetime

# Create new incident
@router.post("/", response_model=IncidentResponse)
def create_incident(incident: IncidentBase):
    new_incident = Incident(
        id=str(uuid4()),
        created_at=datetime.utcnow(),
        **incident.dict()
    )
    INCIDENTS.append(new_incident)
    return enrich_incident(new_incident)

# Get all incidents (optionally filter by days)
@router.get("/", response_model=List[IncidentResponse])
def get_incidents(days: Optional[int] = Query(None, ge=1, le=365)):
    result = INCIDENTS
    if days:
        cutoff = datetime.utcnow() - timedelta(days=days)
        result = [i for i in INCIDENTS if i.created_at >= cutoff]
    return [enrich_incident(i) for i in result]

# Update an incident
@router.put("/{incident_id}", response_model=IncidentResponse)
def update_incident(incident_id: str, updated_incident_data: PartialIncidentUpdate):
    for idx, incident in enumerate(INCIDENTS):
        if incident.id == incident_id:
            if updated_incident_data.title is not None:
                incident.title = updated_incident_data.title
            if updated_incident_data.description is not None:
                incident.description = updated_incident_data.description
            if updated_incident_data.services is not None:
                incident.services = updated_incident_data.services
            if updated_incident_data.type is not None:
                incident.type = updated_incident_data.type
            if updated_incident_data.status is not None:
                incident.status = updated_incident_data.status
            if updated_incident_data.email is not None:
                incident.email = updated_incident_data.email

            return enrich_incident(incident)
    raise HTTPException(status_code=404, detail="Incident not found")

# Patch status
@router.patch("/{incident_id}/status", response_model=IncidentResponse)
def update_incident_status_only(incident_id: str, update: IncidentStatusUpdate):
    for incident in INCIDENTS:
        if incident.id == incident_id:
            incident.status = update.status
            incident.description += f"\n\n--- Status Update [{update.timestamp.strftime('%Y-%m-%d %H:%M:%S')}] ---\n{update.update_message}"
            return enrich_incident(incident)
    raise HTTPException(status_code=404, detail="Incident not found")

# Delete
@router.delete("/{incident_id}")
def delete_incident(incident_id: str):
    global INCIDENTS
    initial_len = len(INCIDENTS)
    INCIDENTS = [i for i in INCIDENTS if i.id != incident_id]
    if len(INCIDENTS) == initial_len:
        raise HTTPException(status_code=404, detail="Incident not found")
    return {"detail": "Incident deleted successfully"}

# Helper function to resolve service names
def enrich_incident(incident: Incident) -> IncidentResponse:
    resolved_services = [SERVICES_MAP.get(s, s) for s in incident.services]
    return IncidentResponse(
        id=incident.id,
        title=incident.title,
        description=incident.description,
        services=resolved_services,
        type=incident.type,
        status=incident.status,
        email=incident.email,
        created_at=incident.created_at
    )
