from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import mixins, permissions, viewsets
from .serializers import TodoSerializer, ProtectedUserSerializer, UserSerializerWithToken

class CreateUserView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializerWithToken
    queryset = User.objects.all()

class ProtectedTodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return self.request.user.todos.all();

class ProtectedUserView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = ProtectedUserSerializer
    queryset = User.objects.all()