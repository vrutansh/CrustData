from typing import Any, List, Optional
from pydantic import BaseModel, Field


class WorkflowStep(BaseModel):
    id: str
    type: str
    depends_on: List[str] = Field(default_factory=list)
    config: dict[str, Any] = Field(default_factory=dict)


class PlannerResponse(BaseModel):
    steps: List[WorkflowStep]
