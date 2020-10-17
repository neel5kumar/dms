# Generated by Django 3.1.2 on 2020-10-17 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deptName', models.CharField(max_length=100)),
                ('deptDescription', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Employees',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('userId', models.CharField(max_length=100, unique=True)),
                ('emailAddress', models.CharField(max_length=100)),
                ('domainId', models.CharField(blank=True, max_length=100)),
                ('createdBy', models.CharField(blank=True, max_length=200)),
                ('createdOn', models.DateTimeField(max_length=200)),
                ('lastUpdatedBy', models.CharField(blank=True, max_length=200)),
                ('lastUpdatedOn', models.DateTimeField(max_length=200)),
                ('phoneNumber', models.CharField(blank=True, max_length=200)),
                ('phoneNumber2', models.CharField(blank=True, max_length=200)),
                ('phoneNumber3', models.CharField(blank=True, max_length=200)),
                ('address', models.CharField(blank=True, max_length=400)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employees.department')),
            ],
        ),
    ]
