# Generated by Django 2.2.4 on 2019-08-18 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='isCoscomplete',
            new_name='completed',
        ),
    ]