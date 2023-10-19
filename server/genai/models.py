from django.db import models

class Genai(models.Model):

    class PurposeChoices(models.TextChoices):
        PRODUCT = ("product", "제품, 서비스 소개")
        EVENT = ("event", "이벤트, 소식 전하기")
    name = models.CharField(
        max_length=100,
    )
    purpose = models.CharField(
        max_length=10,
        choices=PurposeChoices.choices,
    )
    contents = models.TextField()
    output = models.TextField(
        null=True,
        blank=True,
        editable=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)

