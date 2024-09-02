from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class Ads(models.Model):
    MAX_TITLE_LENGTH = 30
    MAX_TITLE_CONDITION = 20
    MAX_TITLE_LOCATION = 30

    user = models.ForeignKey(
        UserModel,
        on_delete=models.DO_NOTHING,
    )

    title = models.CharField(
        max_length=MAX_TITLE_LENGTH,
        null=False,
        blank=False,
    )

    condition = models.CharField(
        max_length=MAX_TITLE_CONDITION,
        null=False,
        blank=False,
    )

    price = models.DecimalField(
        null=False,
        blank=False,
        decimal_places=2,
        max_digits=6,
    )

    location = models.CharField(
        max_length=MAX_TITLE_LOCATION,
        null=False,
        blank=False,
    )

    description = models.TextField(
        null=True,
        blank=True,
    )

    photo = models.URLField(
        null=True,
        blank=True,
    )
