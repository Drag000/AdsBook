from django.urls import path, include

from backend.ads.views import AdsApiListView, AdsApiCreateView, MyAdsApiListView, AdApiDetailsEditDeleteView

urlpatterns = [
    path('', AdsApiListView.as_view(), name='ads_list'),
    path('myads/', MyAdsApiListView.as_view(), name='my_ads_list'),
    path('create/', AdsApiCreateView.as_view(), name='ads_create'),
    path('<int:pk>/', include([
        path('details/', AdApiDetailsEditDeleteView.as_view(), name='ad_details'),
        path('edit/', AdApiDetailsEditDeleteView.as_view(), name='ad_edit'),
        path('delete/', AdApiDetailsEditDeleteView.as_view(), name='ad_delete'),
    ]))
]
