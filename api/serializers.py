from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers
from .models import Profile


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    timestamp = serializers.DateTimeField(read_only=True)


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=6)
    phone = serializers.CharField(max_length=20, allow_blank=True, required=False)
    full_name = serializers.CharField(max_length=255, allow_blank=True, required=False)

    def validate(self, attrs):
        email = attrs.get('email')
        username = attrs.get('username')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': 'Пользователь с таким именем уже существует.'})
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'Пользователь с таким email уже существует.'})
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        phone = validated_data.pop('phone', '')
        full_name = validated_data.pop('full_name', '')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        Profile.objects.create(user=user, phone=phone, full_name=full_name)
        return user


class UserProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    phone = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(read_only=True)

    def get_phone(self, obj):
        try:
            return obj.profile.phone
        except Profile.DoesNotExist:
            return ''

    def get_full_name(self, obj):
        try:
            return obj.profile.full_name
        except Profile.DoesNotExist:
            return ''
