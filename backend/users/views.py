from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer


# Create your views here.

class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

def home(request):
    return JsonResponse({"Message" : "Django Api is working"})
