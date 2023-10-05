from django.db import models


class News(models.Model):
    title = models.CharField(
        max_length=150,
    )
    contents = models.TextField()
    photos = models.ImageField()
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)