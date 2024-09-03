from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token

UserModel = get_user_model()


class RegisterUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = UserModel
        fields = ('username', 'password', 'first_name', 'last_name', 'email')

    # def create(self, validated_data):
    #     user = UserModel.objects.create_user(**validated_data)
    #     return user
    #
    # def validate_email(self, value):
    #     if not value:
    #         raise serializers.ValidationError("Email is required.")
    #     return value

    # Remove password in registration response
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('password')
        return data

    def validate(self, attrs):
        password = attrs.get('password', None)
        try:
            validate_password(password)
        except ValidationError as e:
            raise serializers.ValidationError({"password": e.messages})
        return attrs

    def save(self, **kwargs):
        user = super().save(**kwargs)
        # Ensures the password is hashed before saving
        user.set_password(user.password)
        user.save()

        return user


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'first_name', 'last_name']



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        token = Token.objects.get(user=instance)
        representation['token'] = token.key

        return representation





class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        validate_password(value)  # Validate new password using Django's built-in validators
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
