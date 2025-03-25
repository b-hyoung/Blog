from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),  # users 기능 추가
    path('api/posts/', include('posts.urls')),  # posts 기능 추가
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
#"Bearer bbca229e630aab705ed95de77107a48ca6fe8ac0"