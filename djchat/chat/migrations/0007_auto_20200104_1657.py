# Generated by Django 3.0.1 on 2020-01-04 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_room_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='name',
        ),
        migrations.AddField(
            model_name='room',
            name='group_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]