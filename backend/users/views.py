from rest_framework import generics , views , status
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer , LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# 회원가입 View
class UserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# 로그인 View
class LoginView(APIView): # type: ignore
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