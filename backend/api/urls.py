from rest_framework import routers
from .views import CreateUserView, ProtectedTodoViewSet

router = routers.DefaultRouter()
router.register(r'api/todo', ProtectedTodoViewSet, basename="todo")
router.register(r'auth/register', CreateUserView, basename='user')

urlpatterns = router.urls