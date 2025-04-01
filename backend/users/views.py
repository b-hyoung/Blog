from rest_framework import generics, views, status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.core.cache import cache

# 회원가입 View
class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        role = request.data.get('role')
        if role == 'guest':
            ip = request.META.get('REMOTE_ADDR')
            guest_key = f"guest_signup_{ip}"
            if cache.get(guest_key):
                return Response(
                    {"error": "해당 IP에서 이미 게스트 계정이 생성되었습니다. 잠시 후 다시 시도해주세요."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

        # Execute default CreateAPIView behavior
        response = super().post(request, *args, **kwargs)

        # 게스트 가입 성공 시 IP 기록
        if role == 'guest' and response.status_code == 201:
            ip = request.META.get('REMOTE_ADDR')
            guest_key = f"guest_signup_{ip}"
            cache.set(guest_key, True, timeout=3600)

        # 토큰 발급 로직 추가
        if response.status_code == 201 and response.data.get('username'):
            user = CustomUser.objects.get(username=response.data['username'])
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=201)

        return response
    

# 로그인 View
class LoginView(APIView):  # type: ignore
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=200)
        print("❌ serializer errors:", serializer.errors)  # Move here
        return Response(serializer.errors, status=400)

class UsernameDuplicateCheck(APIView):
    """
    GET 요청으로 username 파라미터를 받아서 해당 아이디가 사용 가능한지 확인하는 API입니다.
    """

    def get(self, request, format=None):
        username = request.GET.get('username', None)
        if not username:
            return Response({'error': 'username 파라미터가 필요합니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # 입력값을 정규화 (공백 제거 및 대소문자 무시)
        username = username.strip()
        user = CustomUser.objects.filter(username__iexact=username).first()
        print(f"Retrieved user: {user}")
        exists = user is not None
        
        # 사용 가능하면 available True, 중복이면 False
        return Response({'available': exists}, status=status.HTTP_200_OK)