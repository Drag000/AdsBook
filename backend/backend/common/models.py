from django.db import models
from django.contrib.auth import get_user_model

from backend.ads.models import Ads

UserModel = get_user_model()


class AdComments(models.Model):
    MAX_TEXT_LENGTH = 333

    text = models.CharField(
        max_length=MAX_TEXT_LENGTH,
        null=False,
        blank=False,
    )

    publication_date_and_time = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=False,
    )

    ad = models.ForeignKey(
        Ads,
        on_delete=models.CASCADE,
        null=False,
        blank=True,
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=True,
    )
