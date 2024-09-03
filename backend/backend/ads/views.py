from rest_framework import generics as api_views, permissions

from backend.ads.models import Ads
from backend.ads.serializers import AdsBaseSerializer, AdsCreateSerializer, AdsDetailsSerializer


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


class AdApiDetailsEditDeleteView(api_views.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Ads.objects.all()
    serializer_class = AdsDetailsSerializer
