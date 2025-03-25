from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Post(models.Model):
    POST_TYPES = [
        ('feedback', 'Feedback'),
        ('qna', 'Q&A'),
        ('cheer', 'Praise & Cheer'),
        
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    type = models.CharField(max_length=10, choices=POST_TYPES)  # ← 여기에 타입 필드 추가
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title