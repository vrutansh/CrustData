from backend.app.schemas.workflow import PlannerResponse, WorkflowStep


def plan_workflow(prompt: str) -> PlannerResponse:
    prompt_lower = prompt.lower()

    if "funding" in prompt_lower:
        return PlannerResponse(
            steps=[
                WorkflowStep(id="watcher", type="watcher", depends_on=[], config={"event": "funding_round"}),
                WorkflowStep(id="company", type="company_search", depends_on=["watcher"], config={"source": "crustdata"}),
                WorkflowStep(id="summary", type="llm", depends_on=["company"], config={"task": "summarize"}),
                WorkflowStep(id="slack", type="slack", depends_on=["summary"], config={"channel": "#alerts"}),
            ]
        )

    if "hire" in prompt_lower or "hiring" in prompt_lower:
        return PlannerResponse(
            steps=[
                WorkflowStep(id="watcher", type="watcher", depends_on=[], config={"event": "hiring"}),
                WorkflowStep(id="company", type="company_search", depends_on=["watcher"], config={"source": "crustdata"}),
                WorkflowStep(id="enrich", type="company_enrichment", depends_on=["company"], config={"scope": "team"}),
                WorkflowStep(id="slack", type="slack", depends_on=["enrich"], config={"channel": "#hiring"}),
            ]
        )

    return PlannerResponse(
        steps=[
            WorkflowStep(id="watcher", type="watcher", depends_on=[], config={"event": "trigger"}),
            WorkflowStep(id="company", type="company_search", depends_on=["watcher"], config={"source": "crustdata"}),
        ]
    )
