# Generated by Django 2.1.2 on 2018-11-14 16:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0004_remove_tripreport_date_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tripreport',
            name='date_posted',
            field=models.DateField(default=datetime.date(2018, 11, 14)),
        ),
    ]