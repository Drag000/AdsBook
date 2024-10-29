from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from backend.ads.models import Ads

UserModel = get_user_model()

VALID_USER_MODEL_DATA_1 = {
    'username': 'Pesho',
    'password': 'wqeQWe123@',
}

VALID_AD_MODEL_DATA_1 = {
    'title': 'My ad',
    'condition': 'New',
    'price': 3,
    'location': 'Sofia',
}


def _create_user(user_data):
    return UserModel.objects.create_user(**user_data)


class AdsCreateViewTests(TestCase):
    def test_create_ad__when_valid__expects_to_be_created(self):
        user = _create_user(VALID_USER_MODEL_DATA_1)
        self.client.login(**VALID_USER_MODEL_DATA_1)

        response = self.client.post(
            reverse('ads_create'),
            data={
                **VALID_AD_MODEL_DATA_1,
                'user_id': user.pk,
            }
        )

        ad = Ads.objects.get()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Ads.objects.count(), 1)
        self.assertEqual(ad.user, user)
        self.assertEqual(ad.title, 'My ad')