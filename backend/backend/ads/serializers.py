from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.response import Response
from backend.ads.models import Ads, AdsPhotos

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class AdsPhotosSerializer(serializers.ModelSerializer):
    photo_url = serializers.ImageField(source='photos')

    class Meta:
        model = AdsPhotos
        fields = ['pk', 'photo_url']


class AdsBaseSerializer(serializers.ModelSerializer):
    photos = AdsPhotosSerializer(many=True, read_only=True)

    class Meta:
        model = Ads
        fields = '__all__'

    # user = UserSerializer()


class AdsEditSerializer(serializers.ModelSerializer):
    photos = AdsPhotosSerializer(many=True, required=False)
    deleted_photos = serializers.ListField(
        write_only=True, required=False
    )

    class Meta:
        model = Ads
        fields = '__all__'


class AdsCreateSerializer(serializers.ModelSerializer):
    photos = AdsPhotosSerializer(many=True, required=False)

    class Meta:
        model = Ads
        fields = ['title', 'location', 'price', 'description', 'condition', 'main_photo', 'photos']

    def create(self, validated_data):
        photos_data = self.context['request'].data.getlist('photos')
        ad = Ads.objects.create(**validated_data)
        if photos_data:
            for photo in photos_data:
                AdsPhotos.objects.create(ad=ad, photos=photo)

        return ad

    # Attaching user_id to the new ad
    def to_internal_value(self, data):
        instance = super().to_internal_value(data)
        instance['user'] = self.context['request'].user

        return instance
