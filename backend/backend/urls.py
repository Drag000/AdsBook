from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/', include([
        path('admin/', admin.site.urls),
        path('ads/', include('backend.ads.urls')),
        path('auth/', include('backend.accounts.urls')),
        path('common/', include('backend.common.urls')),
    ]))
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)