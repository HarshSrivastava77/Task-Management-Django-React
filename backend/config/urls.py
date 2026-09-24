"""
URL configuration for task-management project.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Connect the tasks app API routes under /api/
    path('api/', include('tasks.urls')),
]
