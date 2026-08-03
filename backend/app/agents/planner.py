from backend.app.schemas.workflow import PlannerResponse, Trigger, WorkflowDefinition, WorkflowStep


def plan_workflow(prompt: str) -> PlannerResponse:
    prompt_lower = prompt.lower()

    if "funding" in prompt_lower:
        return PlannerResponse(
            workflow=WorkflowDefinition(
                name="Funding Monitor",
                trigger=Trigger(type="watcher", event="funding"),
                steps=[
                    WorkflowStep(id="company_search", type="company_search", depends_on=[], config={"source": "crustdata"}),
                    WorkflowStep(id="summary", type="llm_summary", depends_on=["company_search"], config={"task": "summarize"}),
                    WorkflowStep(id="slack", type="slack", depends_on=["summary"], config={"channel": "#alerts"}),
                ],
            )
        )

    if "hire" in prompt_lower or "hiring" in prompt_lower:
        return PlannerResponse(
            workflow=WorkflowDefinition(
                name="Hiring Monitor",
                trigger=Trigger(type="watcher", event="hiring"),
                steps=[
                    WorkflowStep(id="company_search", type="company_search", depends_on=[], config={"source": "crustdata"}),
                    WorkflowStep(id="enrich", type="company_enrichment", depends_on=["company_search"], config={"scope": "team"}),
                    WorkflowStep(id="slack", type="slack", depends_on=["enrich"], config={"channel": "#hiring"}),
                ],
            )
        )

    return PlannerResponse(
        workflow=WorkflowDefinition(
            name="Signal Monitor",
            trigger=Trigger(type="watcher", event="trigger"),
            steps=[
                WorkflowStep(id="company_search", type="company_search", depends_on=[], config={"source": "crustdata"}),
            ],
        )
    )
