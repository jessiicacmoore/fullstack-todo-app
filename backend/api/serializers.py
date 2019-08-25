from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


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