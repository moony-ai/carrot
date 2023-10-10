from rest_framework.serializers import ModelSerializer
from .models import Genai

class GenaiSerializer(ModelSerializer):
    class Meta:
        model = Genai
        fields= "__all__"