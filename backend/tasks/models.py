from django.db import models


class Task(models.Model):
    """
    Task model representing an item in the task management system.
    """

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    title = models.CharField(max_length=200, help_text="Title of the task")
    description = models.TextField(blank=True, default='', help_text="Detailed description of the task")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        help_text="Current status of the task"
    )
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text="Priority level of the task"
    )
    created_at = models.DateTimeField(auto_now_add=True, help_text="Timestamp when the task was created")
    updated_at = models.DateTimeField(auto_now=True, help_text="Timestamp when the task was last updated")

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'

    def __str__(self):
        return f"{self.title} ({self.status})"
