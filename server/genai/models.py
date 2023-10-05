from django.db import models

class Genai(models.Model):
    prompt = models.TextField()
    output = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
