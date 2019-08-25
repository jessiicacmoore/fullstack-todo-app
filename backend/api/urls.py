from rest_framework import routers
from .views import CreateUserView, ProtectedTodoViewSet

router = routers.DefaultRouter()
router.register(r'api/register', CreateUserView, basename='user')
router.register(r'api/todo', ProtectedTodoViewSet, basename="todo")

urlpatterns = router.urls