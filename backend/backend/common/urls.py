from django.urls import path, include

from backend.common.views import CommentsApiCreateView, CommentsApiAllView, CommentsApiDeleteView

urlpatterns = (
    path('comments/<int:ad_id>/', include([
        path('create/', CommentsApiCreateView.as_view(), name='comments_create'),
        path('all/', CommentsApiAllView.as_view(), name='comments_all'),
    ])),
    path('comments/delete/<int:pk>', CommentsApiDeleteView.as_view(), name='delete_comment'),
    # path('rate/<int:trip_id>/', rate_trip, name='rate trip'),
)
