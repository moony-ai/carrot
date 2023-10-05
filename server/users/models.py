from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    # 비활성화
    first_name = models.CharField(
        max_length=150, 
        editable=False,
    )
    last_name = models.CharField(
        max_length=150, 
        editable=False,
    )
    name = models.CharField(
        max_length=150, 
        default="",
    )