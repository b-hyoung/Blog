from .models import Post
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]  # 인증된 사용자만 CRUD 가능

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author != request.user:
            return Response({'error': '권한이 없습니다.'}, status=403)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.author != request.user:
            return Response({'error': '권한이 없습니다.'}, status=403)
        return super().destroy(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        post_type = request.GET.get('type')

        if post_type == 'my':
            # 로그인 유저가 작성한 글만 필터링 (author 필드가 request.user와 동일)
            queryset = Post.objects.filter(author=request.user)
        elif post_type:
            queryset = Post.objects.filter(type=post_type)
        else:
            queryset = Post.objects.filter(type='feedback')

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='read_post')
    def get_post_by_id(self, request):
        post_id = request.GET.get('id')
        if not post_id:
            return Response({'error': 'ID parameter is required.'}, status=400)
        post = get_object_or_404(Post, id=post_id)
        serializer = self.get_serializer(post)
        return Response(serializer.data)