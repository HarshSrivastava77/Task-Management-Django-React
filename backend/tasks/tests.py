from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Task


class TaskAPITests(TestCase):
    """
    Test suite for Task CRUD REST API endpoints.
    """

    def setUp(self):
        self.client = APIClient()
        self.task1 = Task.objects.create(
            title="Initial Task 1",
            description="First test task description",
            status="pending",
            priority="medium"
        )
        self.task2 = Task.objects.create(
            title="Initial Task 2",
            description="Second test task description",
            status="completed",
            priority="high"
        )
        self.list_create_url = reverse('task-list')
        self.detail_url_1 = reverse('task-detail', kwargs={'pk': self.task1.pk})

    def test_list_tasks(self):
        """Test GET /api/tasks/ lists all tasks."""
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_task(self):
        """Test POST /api/tasks/ creates a task successfully."""
        payload = {
            "title": "New Integration Task",
            "description": "Integration testing description",
            "status": "pending",
            "priority": "high"
        }
        response = self.client.post(self.list_create_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "New Integration Task")
        self.assertEqual(Task.objects.count(), 3)

    def test_create_task_validation_error(self):
        """Test POST /api/tasks/ fails with empty title."""
        payload = {
            "title": "   ",
            "description": "Invalid task"
        }
        response = self.client.post(self.list_create_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)

    def test_retrieve_single_task(self):
        """Test GET /api/tasks/<id>/ retrieves task details."""
        response = self.client.get(self.detail_url_1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.task1.id)
        self.assertEqual(response.data["title"], self.task1.title)

    def test_update_task_put(self):
        """Test PUT /api/tasks/<id>/ updates entire task."""
        payload = {
            "title": "Updated Task 1",
            "description": "Updated description",
            "status": "completed",
            "priority": "low"
        }
        response = self.client.put(self.detail_url_1, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Updated Task 1")
        self.assertEqual(response.data["status"], "completed")

    def test_partial_update_task_patch(self):
        """Test PATCH /api/tasks/<id>/ updates specific fields."""
        payload = {"status": "completed"}
        response = self.client.patch(self.detail_url_1, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "completed")
        self.task1.refresh_from_db()
        self.assertEqual(self.task1.status, "completed")

    def test_toggle_status_action(self):
        """Test PATCH /api/tasks/<id>/toggle-status/ toggles pending <-> completed."""
        toggle_url = reverse('task-toggle-status', kwargs={'pk': self.task1.pk})
        response = self.client.patch(toggle_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "completed")

        # Toggle again
        response = self.client.patch(toggle_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "pending")

    def test_delete_task(self):
        """Test DELETE /api/tasks/<id>/ removes task."""
        response = self.client.delete(self.detail_url_1)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 1)
        self.assertFalse(Task.objects.filter(pk=self.task1.pk).exists())
