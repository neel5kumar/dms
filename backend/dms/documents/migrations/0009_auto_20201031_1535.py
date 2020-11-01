# Generated by Django 3.1.2 on 2020-10-31 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0008_auto_20201024_1619'),
    ]

    operations = [
        migrations.AddField(
            model_name='documentmeta',
            name='documentMetaAuto',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AlterField(
            model_name='documentmeta',
            name='document',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documentMeta', to='documents.documents'),
        ),
    ]