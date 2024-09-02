from rest_framework import serializers

from backend.common.models import AdComments


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdComments
        fields = ['text']

    def to_internal_value(self, data):
        instance = super().to_internal_value(data)
        instance['user'] = self.context['request'].user
        instance['ad_id'] = self.context['request'].data['ad_id']
        return instance


class CommentsAllSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = AdComments
        fields = '__all__'
