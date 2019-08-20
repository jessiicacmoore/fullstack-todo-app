from django.urls import path
from rest_framework import routers
from .views import UserModelViewSet, TodosCreateUpdateDelete

router = routers.DefaultRouter()
router.register(r'api/user', UserModelViewSet, basename='user')
router.register(r'api/todo', TodosCreateUpdateDelete, basename='todos')

urlpatterns = router.urls