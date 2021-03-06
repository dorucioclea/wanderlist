# Generated by Django 2.1.2 on 2018-10-29 11:20

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('topLevelDomain', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('alpha2Code', models.CharField(blank=True, max_length=255, null=True)),
                ('alpha3Code', models.CharField(blank=True, max_length=255, null=True)),
                ('callingCodes', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('capital', models.CharField(blank=True, max_length=255, null=True)),
                ('altSpellings', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('region', models.CharField(blank=True, max_length=255, null=True)),
                ('subregion', models.CharField(blank=True, max_length=255, null=True)),
                ('population', models.IntegerField(blank=True, null=True)),
                ('latlng', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('demonym', models.CharField(blank=True, max_length=255, null=True)),
                ('area', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('gini', models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ('timezones', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('borders', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('nativeName', models.CharField(blank=True, max_length=255, null=True)),
                ('numericCode', models.CharField(blank=True, max_length=255, null=True)),
                ('flag', models.CharField(blank=True, max_length=255, null=True)),
                ('cioc', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='currencies',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('symbol', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='languages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('iso639_1', models.CharField(blank=True, max_length=255, null=True)),
                ('iso639_2', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('nativeName', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='regionalBlocs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acronym', models.CharField(blank=True, max_length=255, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('otherAcronyms', models.CharField(blank=True, max_length=255, null=True)),
                ('otherNames', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='translations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('de', models.CharField(blank=True, max_length=255, null=True)),
                ('es', models.CharField(blank=True, max_length=255, null=True)),
                ('fr', models.CharField(blank=True, max_length=255, null=True)),
                ('ja', models.CharField(blank=True, max_length=255, null=True)),
                ('it', models.CharField(blank=True, max_length=255, null=True)),
                ('br', models.CharField(blank=True, max_length=255, null=True)),
                ('pt', models.CharField(blank=True, max_length=255, null=True)),
                ('nl', models.CharField(blank=True, max_length=255, null=True)),
                ('hr', models.CharField(blank=True, max_length=255, null=True)),
                ('fa', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='country',
            name='currencies',
            field=models.ManyToManyField(to='api.currencies'),
        ),
        migrations.AddField(
            model_name='country',
            name='languages',
            field=models.ManyToManyField(to='api.languages'),
        ),
        migrations.AddField(
            model_name='country',
            name='regionalBlocs',
            field=models.ManyToManyField(to='api.regionalBlocs'),
        ),
        migrations.AddField(
            model_name='country',
            name='translations',
            field=models.ManyToManyField(to='api.translations'),
        ),
    ]
