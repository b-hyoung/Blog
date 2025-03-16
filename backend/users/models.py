from django.db import models
import random
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, role='user', **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('role', 'djgnfj')
        return self.create_user(username, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('djgnfj', 'Djgnfj'),
        ('guest', 'Guest')
    ]

    username = models.CharField(max_length=10, unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['role']

    objects = CustomUserManager()

    # Guest 자동 랜덤 ID 생성 로직
    def save(self, *args, **kwargs):
        if self.role == 'guest' and not self.username:
            self.username = f'guest_{random.randint(1000, 9999)}'  
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'custom_user'  # 데이터베이스 테이블명 지정
