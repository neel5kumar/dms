# Generated by Django 3.1.2 on 2020-10-24 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0003_documentmeta'),
    ]

    operations = [
        migrations.AddField(
            model_name='documents',
            name='docuementSize',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
