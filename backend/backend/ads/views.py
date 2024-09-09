from django.db.migrations import serializer
from rest_framework import generics as api_views, permissions
from rest_framework.response import Response

from backend.ads.models import Ads, AdsPhotos
from backend.ads.serializers import AdsBaseSerializer, AdsCreateSerializer, AdsEditSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class AdsApiListView(api_views.ListAPIView):
    queryset = Ads.objects.all()
    serializer_class = AdsBaseSerializer


class MyAdsApiListView(api_views.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Ads.objects.all()
    serializer_class = AdsBaseSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        queryset = queryset.filter(user=self.request.user)

        return queryset


class AdsApiCreateView(api_views.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AdsCreateSerializer
    parser_classes = (MultiPartParser, FormParser)


class AdApiDetailsDeleteView(api_views.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Ads.objects.all()
    serializer_class = AdsBaseSerializer


class AdApiEditView(api_views.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Ads.objects.all()
    serializer_class = AdsEditSerializer
    parser_classes = (MultiPartParser, FormParser)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        deleted_photos = data.get('deleted_photos', [])

        if isinstance(deleted_photos, str):
            try:
                deleted_photos = eval(deleted_photos)
            except:
                return Response({"error": "Invalid deleted_photos format"}, status=400)

        if deleted_photos:
            AdsPhotos.objects.filter(id__in=deleted_photos, ad=instance).delete()

        photos_data = request.FILES.getlist('photos')
        for photo in photos_data:
            AdsPhotos.objects.create(ad=instance, photos=photo)


        return super().update(request, *args, **kwargs)

