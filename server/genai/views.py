from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound 
from rest_framework.status import HTTP_204_NO_CONTENT
import openai

from .prompts import Prompt

from .models import Genai
from .serializers import GenaiSerializer

import os
api_key = os.environ.get("API_KEY")
openai.api_key = api_key

class Genai(APIView):
    def post(self, request):
        serializer = GenaiSerializer(data=request.data)
        output = chatGPT(request.data["prompt"])
        if serializer.is_valid():
            return Response(output)
        else:
            return Response(serializer.errors)

def chatGPT(userInput):
    prompt = list()
    prompt.append({"role": "system", "content": Prompt.prompt})
    prompt.append({"role": "user", "content": userInput})
    
    #Chat GPT API
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=prompt,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    
    #그동안의 대화 추가
    prompt.append({
        "role" : response['choices'][0]['message']['role'],
        "content" : response['choices'][0]['message']['content']
    })
    
    return response['choices'][0]['message']['content']
