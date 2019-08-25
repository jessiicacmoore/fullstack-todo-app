from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'task', 'completed')
    
    def create(self, validated_data):
        user = self.context['request'].user
        todo = Todo.objects.create(owner=user, **validated_data)
        return todo

    def update(self, instance, validated_data):
        instance.task = validated_data.get('task', instance.task)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.save()
        return instance


class ProtectedUserSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'todos')


class UserSerializerWithToken(serializers.ModelSerializer):
    tokens  = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('tokens', 'username', 'password')

    def get_tokens(self, obj):
        refresh = RefreshToken.for_user(obj)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def create(self, validated_data):
        user = super(UserSerializerWithToken, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
