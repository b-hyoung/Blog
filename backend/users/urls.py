from django.contrib import admin
from django.urls import path
from .views import (home , UserCreateView)

urlpatterns = [
    path("",home ,name="home"),
    path("register/" , UserCreateView.as_view() , name = 'user-register')
]