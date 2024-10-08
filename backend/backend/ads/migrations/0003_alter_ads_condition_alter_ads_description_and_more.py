# Generated by Django 4.2.15 on 2024-08-21 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0002_rename_conditions_ads_condition_ads_photo_ads_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ads',
            name='condition',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='ads',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ads',
            name='location',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='ads',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=6),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ads',
            name='title',
            field=models.CharField(max_length=30),
        ),
    ]
