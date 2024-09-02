from django.urls import path, include

from backend.accounts.views import ApiRegisterUserView, ApiLoginUserView, ApiLogoutUserView, ApiEditUserProfileView, \
    ApiEditUserPasswordView, ApiDeleteUserProfileView

urlpatterns = [
    path('register/', ApiRegisterUserView.as_view(), name='register'),
    path('login/', ApiLoginUserView.as_view(), name='login'),
    path('logout/', ApiLogoutUserView.as_view(), name='logout'),
    path('<int:pk>/', include([
        path('edit/', ApiEditUserProfileView.as_view(), name='edit_profile'),
        path('delete/', ApiDeleteUserProfileView.as_view(), name='delete_profile'),
        path('change-password/', ApiEditUserPasswordView.as_view(), name='edit_password'),
    ]))
]


