from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.agents.planner import plan_workflow
from backend.app.schemas.workflow import PlannerResponse

router = APIRouter(prefix="/api/planner", tags=["planner"])


class PlannerRequest(BaseModel):
    prompt: str


@router.post("", response_model=PlannerResponse)
def generate_plan(request: PlannerRequest) -> PlannerResponse:
    return plan_workflow(request.prompt)
