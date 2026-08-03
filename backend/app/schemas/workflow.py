from typing import Any, List
from pydantic import BaseModel, Field


class WorkflowStep(BaseModel):
    id: str
    type: str
    depends_on: List[str] = Field(default_factory=list)
    config: dict[str, Any] = Field(default_factory=dict)


class Trigger(BaseModel):
    type: str
    event: str


class WorkflowDefinition(BaseModel):
    name: str
    trigger: Trigger
    steps: List[WorkflowStep]


class PlannerResponse(BaseModel):
    workflow: WorkflowDefinition
