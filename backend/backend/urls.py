from django.contrib import admin
from django.urls import path, include

urlpatterns = (
    path('admin/', admin.site.urls),
    path('ads/', include('backend.ads.urls')),
    path('auth/', include('backend.accounts.urls')),
    path('common/', include('backend.common.urls')),
)
