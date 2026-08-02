from backend.app.agents.planner import plan_workflow


def build_plan(prompt: str):
    return plan_workflow(prompt)
