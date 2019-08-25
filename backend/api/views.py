from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import mixins, permissions, viewsets
from .serializers import UserSerializerWithToken

class CreateUserView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializerWithToken
    queryset = User.objects.all()

