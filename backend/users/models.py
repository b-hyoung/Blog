from django.db import models #django의 모델을 생성하기위한 모듈
import uuid ## 고유 문자열생성 (guest ????)
from django.contrib.auth.models import AbstractBaseUser # 사용자 인증 기능 정의(id,password)
import random

# Create your models here.

# CustomUser 라는 모델명을 사용하며 AbstractBaseUser를 상속받음으로써 django인증 시스템으로 사용자 비밀번호 로그인 , 로그아웃 등 기능사용가능
class CustomUser(AbstractBaseUser):
    ROLE_CHOICES = [
        ('user' , 'User'),
        ('djgnfj' , 'Djgnfj'),
        ('guest' , 'Guest')
    ]

    # 규칙 :
    # max_length 10글자 미만 choice 는 내가 준 세개중하나로 디폴트값은 user
    username = models.CharField(max_length=10, unique=True, default='guest_0000')  # 기본값 추가
    role = models.CharField(max_length=10 , choices=ROLE_CHOICES ,default="user" )
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    ##Guest 자동 랜덤 Id생성
    def save(self, *args, **kwargs):
        if self.role == 'guest' and (not self.username or self.username == 'guest_0000'):
            self.username = f'guest_{random.randint(1000, 9999)}'  # 4자리 랜덤 문자열
        super().save(*args, **kwargs)
