from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    nickname = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'nickname', 'content', 'type', 'created_at']
        read_only_fields = ['author', 'created_at']

    def get_nickname(self, obj):
        return obj.author.username