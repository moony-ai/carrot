from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound 
from rest_framework.status import HTTP_204_NO_CONTENT

from .models import User
from .serializers import UserSerializer

class Users(APIView):
    def get(self, request):
        all_users = User.objects.all()
        serializer = UserSerializer(all_users, many=True)
        return Response(serializer.data)

class UserDetail(APIView):
    def get(self, request):
        pass
    def put(self, request):
        pass