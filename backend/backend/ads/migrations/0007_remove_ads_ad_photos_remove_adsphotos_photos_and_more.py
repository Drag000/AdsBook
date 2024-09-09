# Generated by Django 4.2.15 on 2024-09-04 11:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0006_adsphotos_remove_ads_photo_ads_ad_photos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ads',
            name='ad_photos',
        ),
        migrations.RemoveField(
            model_name='adsphotos',
            name='photos',
        ),
        migrations.AddField(
            model_name='ads',
            name='main_photo',
            field=models.ImageField(blank=True, null=True, upload_to='ads_main_photos/'),
        ),
        migrations.AddField(
            model_name='adsphotos',
            name='ad',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, to='ads.ads'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='adsphotos',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='ads_photos/'),
        ),
    ]