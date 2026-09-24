from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for the Task model.
    Converts Task model instances to/from JSON format.
    """

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'priority',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_title(self, value):
        """
        Validate that the title is not just blank whitespace.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("Task title cannot be empty.")
        return value.strip()
