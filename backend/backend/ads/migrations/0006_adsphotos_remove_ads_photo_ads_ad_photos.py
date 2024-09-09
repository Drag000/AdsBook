# Generated by Django 4.2.15 on 2024-09-03 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0005_alter_ads_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdsPhotos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.FileField(blank=True, null=True, upload_to='trips_photos')),
                ('photos', models.FileField(blank=True, null=True, upload_to='trips_photos')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='ads',
            name='photo',
        ),
        migrations.AddField(
            model_name='ads',
            name='ad_photos',
            field=models.ManyToManyField(blank=True, to='ads.adsphotos'),
        ),
    ]