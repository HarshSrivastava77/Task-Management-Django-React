from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Using Django REST Framework's DefaultRouter to register task routes
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
]
