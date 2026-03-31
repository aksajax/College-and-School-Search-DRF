from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CollegeViewSet

router = DefaultRouter()
router.register(r'list', CollegeViewSet) # Endpoint: /api/colleges/list/

urlpatterns = [
    path('', include(router.urls)),
]