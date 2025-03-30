from rest_framework import serializers
from .models import CustomUser
import random
from django.contrib.auth import authenticate 

# 회원가입 유저 및 게스트 생성 serializers
class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': False}
        }

    def validate(self, data):
        """비밀번호 확인 로직"""
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': '비밀번호가 일치하지 않습니다.'})
        return data

    def create(self, validated_data):
        """Guest 자동 생성 로직"""
        if validated_data.get('role') == 'guest' and not validated_data.get('username'):
            validated_data['username'] = str(random.randint(1000, 9999))  # 🔥 4자리 랜덤 숫자

        validated_data.pop('password2')  # 🔥 항상 제거하도록 이동
        password = validated_data.pop('password')  #비밀번호 분리

        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)  # 비밀번호 해싱
        user.save()

        return user

# 로그인 폼 Serializers
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=12)
    password = serializers.CharField(write_only=True)
    def validate(self,data):
        user = authenticate(
           username = data['username'],
           password = data['password']
        )
        print("✅ 인증 시도 결과:", user)  # ← 추가해보세요!
        if not user:
            raise serializers.ValidationError("아이디 또는 비밀번호가 올바르지 않습니다.")
        data['user'] = user
        return data
        

    