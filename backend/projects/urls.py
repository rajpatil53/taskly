from django.urls import path, include
from rest_framework_nested import routers

from . import views

project_router = routers.DefaultRouter()
project_router.register(r"", views.ProjectViewSet)

task_router = routers.NestedSimpleRouter(project_router, r"", lookup="project")
task_router.register(r"tasks", views.TaskViewSet, basename="task")

subtask_router = routers.NestedSimpleRouter(task_router, r"tasks", lookup="task")
subtask_router.register(r"subtasks", views.SubtaskViewSet, basename="subtask")

urlpatterns = [
    path("", include(project_router.urls)),
    path("", include(task_router.urls)),
    path("", include(subtask_router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
