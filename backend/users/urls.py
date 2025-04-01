from django.contrib import admin
from django.urls import path
from .views import (LoginView , UserCreateView, UsernameDuplicateCheck, refresh_token_view)

urlpatterns = [
    path("register/" , UserCreateView.as_view() , name = 'register'),
    path("check-username/" , UsernameDuplicateCheck.as_view(), name='check-username'),
    path("",LoginView.as_view(),name='login'),
    path("token/refresh/", refresh_token_view, name='token_refresh'),
]