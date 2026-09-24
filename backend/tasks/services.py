"""
tasks/services.py

Architecture Placeholder: Future Third-Party & AI Service Integrations.

This module illustrates where business logic, external API integrations,
and AI features can be cleanly hooked in without modifying views or models directly.

Examples of future integrations:
1. AI Task Priority Suggestion / Description Enhancement (e.g. OpenAI / Gemini)
2. External Calendar / Slack notification sync
3. Task Auto-Categorization
"""

import logging

logger = logging.getLogger(__name__)


class TaskAIService:
    """
    Placeholder service for future AI integrations (e.g., auto-generating
    summaries, suggesting priorities, or breaking down complex tasks).
    """

    @staticmethod
    def suggest_priority(title: str, description: str) -> str:
        """
        Example heuristic/AI mock placeholder.
        In the future, an LLM or ML model could analyze the text and return 'high', 'medium', or 'low'.
        """
        high_urgency_keywords = ['urgent', 'asap', 'critical', 'blocker', 'immediately']
        content = f"{title} {description}".lower()
        if any(keyword in content for keyword in high_urgency_keywords):
            return 'high'
        return 'medium'


class TaskNotificationService:
    """
    Placeholder service for future third-party notifications
    (e.g., Email, Slack webhook, Twilio SMS).
    """

    @staticmethod
    def send_task_created_alert(task_id: int, task_title: str) -> bool:
        """
        Dispatches notification when a new task is created.
        Currently logs the event for observability.
        """
        logger.info(f"[Service Alert] Task #{task_id} '{task_title}' created successfully.")
        return True
