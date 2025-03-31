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

    def list(self,request,*args,**kwargs):
        post_type = request.GET.get('type')
        if(post_type):
            queryset=Post.objects.filter(type=post_type)
        else:
            queryset=Post.objects.filter(type='feedback')
        serializer = self.get_serializer(queryset,many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='read_post')
    def get_post_by_id(self, request):
        post_id = request.GET.get('id')
        if not post_id:
            return Response({'error': 'ID parameter is required.'}, status=400)
        post = get_object_or_404(Post, id=post_id)
        serializer = self.get_serializer(post)
        return Response(serializer.data)