# Generated by Django 3.1.2 on 2020-10-24 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0007_auto_20201024_0905'),
    ]

    operations = [
        migrations.RenameField(
            model_name='documentmeta',
            old_name='DocumentMeta',
            new_name='documentMeta',
        ),
    ]
