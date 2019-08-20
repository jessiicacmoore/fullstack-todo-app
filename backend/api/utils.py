from todos.serializers import UserSerializer
from collections import namedtuple

def my_jwt_response_handler(token, user=None, request=None, *kwargs):
    return ({
        'token': token,
        'user': UserSerializer(user, context={'request': request},).data
    })


