from .models import Post
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]  # 인증된 사용자만 CRUD 가능

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def post_list(request):
        post_type = request.GET.get('type')
        if post_type :
            posts = Post.objects.filter(type=post_type)  # URL에서 ?type=qna 같은 방식으로 전달
        else :
            posts = Post.objects.filter(type='feedback') # 타입 파라미터가 없으면 전체 게시글을 가져옴
        serializer = PostSerializer(posts , many=True)
        return Response(serializer.data)