import random
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False, 'allow_blank': True},
            'username': {'required': False, 'allow_blank': True, 'max_length': 10},
        }

    def validate(self, data):
        role = data.get('role')
        if not role:
            data['role'] = 'guest'
            role = 'guest'
        
        if role == 'guest':
            if not data.get('username'):
                for _ in range(10):  # 최대 10회 시도
                    random_username = f"Guest{random.randint(1000, 9999)}"
                    if not CustomUser.objects.filter(username=random_username).exists():
                        data['username'] = random_username
                        break
                else:
                    raise serializers.ValidationError({"username": "사용 가능한 게스트 아이디를 생성하지 못했습니다. 다시 시도해주세요."})
            else:
                if CustomUser.objects.filter(username=data['username']).exists():
                    raise serializers.ValidationError({"username": "이미 사용 중인 아이디입니다."})
        
        if role != 'guest':
            if not data.get('password'):
                raise serializers.ValidationError({"password": "비밀번호를 입력해주세요."})
            if not data.get('password2'):
                raise serializers.ValidationError({"password2": "비밀번호 확인을 입력해주세요."})
            if data['password'] != data['password2']:
                raise serializers.ValidationError({"password2": "비밀번호가 일치하지 않습니다."})
        
        return super().validate(data)

    def create(self, validated_data):
        role = validated_data.get('role')
        if role == 'guest':
            # username이 아직 없다면 생성 (validate에서 이미 생성됐을 수도 있음)
            if not validated_data.get('username'):
                for _ in range(10):  # 최대 10회 시도
                    random_username = f"Guest{random.randint(1000, 9999)}"
                    if not CustomUser.objects.filter(username=random_username).exists():
                        validated_data['username'] = random_username
                        break
                else:
                    raise serializers.ValidationError({"username": "게스트 아이디 생성 실패, 다시 시도해주세요."})

            validated_data.pop('password', None)
            validated_data.pop('password2', None)
            user = CustomUser.objects.create(**validated_data)
            user.set_unusable_password()
            user.save()
            return user
        else:
            validated_data.pop('password2', None)
            password = validated_data.pop('password', None)
            user = CustomUser.objects.create(**validated_data)
            user.set_password(password)
            user.save()
            return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=10)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("제공된 자격 증명으로 로그인할 수 없습니다.")
        else:
            raise serializers.ValidationError("username과 password 필드를 모두 포함해야 합니다.")
        data['user'] = user
        return data