from rest_framework.authtoken import views as api_auth_views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import generics as api_views, serializers, status, permissions

from backend.accounts.serializers import RegisterUserSerializer, UserSerializer, PasswordChangeSerializer, \
    UserBaseSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class ApiLoginUserView(api_auth_views.ObtainAuthToken):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })


class ApiRegisterUserView(api_views.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer


class ApiEditUserProfileView(api_views.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class ApiDetailsUserProfileView(api_views.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserModel.objects.all()
    serializer_class = UserBaseSerializer


class ApiDeleteUserProfileView(api_views.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserModel.objects.all()
    serializer_class = UserBaseSerializer


class ApiLogoutUserView(api_views.views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"detail": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)


class ApiEditUserPasswordView(api_views.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PasswordChangeSerializer
    model = UserModel

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)
