# Generated by Django 3.1.2 on 2020-10-24 01:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0004_documents_docuementsize'),
    ]

    operations = [
        migrations.RenameField(
            model_name='documents',
            old_name='docuementSize',
            new_name='documentSize',
        ),
    ]
