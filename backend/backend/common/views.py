from rest_framework import generics as api_views, permissions

from backend.common.models import AdComments
from backend.common.serializers import CommentCreateSerializer, CommentsAllSerializer


class CommentsApiCreateView(api_views.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentCreateSerializer


class CommentsApiAllView(api_views.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentsAllSerializer

    def get_queryset(self):
        ad_id = self.kwargs.get('ad_id')  # Extract 'pk' from URL parameters
        return AdComments.objects.filter(ad_id=ad_id)


class CommentsApiDeleteView(api_views.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AdComments.objects.all()
    serializer_class = CommentsAllSerializer
