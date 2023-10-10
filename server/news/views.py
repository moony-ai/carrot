from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound 
from rest_framework.status import HTTP_204_NO_CONTENT

from .models import News as news_model
from .serializers import NewsSerializer

class News(APIView):
    def get(self, request):
        all_news = news_model.objects.all()
        serializer = NewsSerializer(all_news, many=True)
        return Response(serializer.data)

class NewsDetail(APIView):
    def get_object(self, pk):
        try:
            return news_model.objects.get(pk=pk)
        except news_model.DoesNotExist:
            return Response(NotFound)
        
    def get(self, request, pk):
        news = self.get_object(pk)
        serializer = NewsSerializer(news)
        return Response(serializer.data)
    
    def put(self, request, pk):
        pass