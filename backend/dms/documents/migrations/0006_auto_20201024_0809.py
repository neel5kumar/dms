# Generated by Django 3.1.2 on 2020-10-24 08:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0005_auto_20201024_0116'),
    ]

    operations = [
        migrations.RenameField(
            model_name='documentmeta',
            old_name='docuemnt',
            new_name='documentId',
        ),
    ]
