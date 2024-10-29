from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class Ads(models.Model):
    MAX_TITLE_LENGTH = 30
    MAX_TITLE_CONDITION = 20
    MAX_TITLE_LOCATION = 30

    CONDITION_CHOICES = (
        ('New', 'New'),
        ('Used', 'Used')
    )

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
        choices=CONDITION_CHOICES,
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

    main_photo = models.ImageField(
        upload_to='ads_main_photos/',
        null=True,
        blank=True,
    )


class AdsPhotos(models.Model):
    ad = models.ForeignKey(
        Ads,
        on_delete=models.CASCADE,
        related_name='photos',
    )

    photos = models.ImageField(
        upload_to='ads_photos/',
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=False,
        blank=False,
    )
