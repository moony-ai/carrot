from django.urls import path
from . import views

urlpatterns = [
    path("", views.News.as_view()),
    path("<int:pk>", views.NewsDetail.as_view()),
]