from django.contrib import admin
from django.urls import path
from .views import (LoginView , UserCreateView)

urlpatterns = [
    path("register/" , UserCreateView.as_view() , name = 'register'),
    path("login/",LoginView.as_view(),name='login')
]