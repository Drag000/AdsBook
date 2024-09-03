from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.ads.models import Ads

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class AdsBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = '__all__'


class AdsDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = '__all__'

    # user = UserSerializer()


class AdsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ads
        fields = ['title', 'location', 'price', 'description', 'condition', 'photo']

    # Attaching user_id to the new ad
    def to_internal_value(self, data):
        instance = super().to_internal_value(data)
        instance['user'] = self.context['request'].user

        return instance
