from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4
from datetime import datetime

router = APIRouter(prefix="/organizations", tags=["organizations"])

# In-memory storage
ORGANIZATIONS = []
MEMBERS = []

class OrganizationBase(BaseModel):
    name: str

class Organization(OrganizationBase):
    id: str
    created_at: datetime

class TeamMember(BaseModel):
    id: str
    user_email: str
    organization_id: str
    role: str  # admin, member

# Add this new Pydantic model for updating a member's role
class MemberRoleUpdate(BaseModel):
    role: str

@router.post("/", response_model=Organization)
def create_organization(org: OrganizationBase):
    new_org = Organization(id=str(uuid4()), created_at=datetime.utcnow(), **org.dict())
    ORGANIZATIONS.append(new_org)
    return new_org

@router.get("/", response_model=List[Organization])
def list_organizations():
    return ORGANIZATIONS

@router.put("/{org_id}", response_model=Organization)
def update_organization(org_id: str, org: OrganizationBase):
    for organization in ORGANIZATIONS:
        if organization.id == org_id:
            organization.name = org.name
            return organization
    raise HTTPException(status_code=404, detail="Organization not found")

@router.delete("/{org_id}", response_model=Organization)
def delete_organization(org_id: str):
    for organization in ORGANIZATIONS:
        if organization.id == org_id:
            ORGANIZATIONS.remove(organization)
            return organization
    raise HTTPException(status_code=404, detail="Organization not found")

@router.post("/members/", response_model=TeamMember)
def add_member(member: TeamMember):
    MEMBERS.append(member)
    return member

@router.get("/{org_id}/members", response_model=List[TeamMember])
def get_members(org_id: str):
    return [m for m in MEMBERS if m.organization_id == org_id]

@router.delete("/members/{member_id}", response_model=TeamMember)
def delete_member(member_id: str):
    for member in MEMBERS:
        if member.id == member_id:
            MEMBERS.remove(member)
            return member
    raise HTTPException(status_code=404, detail="Member not found")

@router.put("/members/{member_id}", response_model=TeamMember)
def update_member_role(member_id: str, member_update: MemberRoleUpdate):
    # Search for the member by ID
    for m in MEMBERS:
        if m.id == member_id:
            # Update the role of the found member
            m.role = member_update.role # Access the role from the Pydantic model
            return m
    raise HTTPException(status_code=404, detail="Member not found")