from .models import Post
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]  # 인증된 사용자만 CRUD 가능

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)