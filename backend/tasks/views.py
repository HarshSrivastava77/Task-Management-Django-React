from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations on Task items:
    - GET    /api/tasks/          -> List all tasks
    - POST   /api/tasks/          -> Create a new task
    - GET    /api/tasks/<id>/     -> Retrieve a single task
    - PUT    /api/tasks/<id>/     -> Update an entire task
    - PATCH  /api/tasks/<id>/     -> Partially update a task
    - DELETE /api/tasks/<id>/     -> Delete a task
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=True, methods=['patch'], url_path='toggle-status')
    def toggle_status(self, request, pk=None):
        """
        Convenience endpoint to toggle status between 'pending' and 'completed'.
        PATCH /api/tasks/<id>/toggle-status/
        """
        task = self.get_object()
        task.status = 'completed' if task.status == 'pending' else 'pending'
        task.save()
        serializer = self.get_serializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
