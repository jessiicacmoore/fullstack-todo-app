from rest_framework import routers
from .views import CreateUserView

router = routers.DefaultRouter()
router.register(r'api/user', CreateUserView, basename='user')

urlpatterns = router.urls