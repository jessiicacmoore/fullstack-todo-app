from django.contrib import admin
from django.urls import path, include

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token

urlpatterns = [
    path('', include('todos.urls')),
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('token-auth-refresh/', refresh_jwt_token)
]
