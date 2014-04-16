from __future__ import unicode_literals

from django.contrib.gis.db import models

class BollettinoDomani(models.Model):
    id_0 = models.IntegerField(primary_key=True)
    geom = models.MultiPolygonField(srid=32632, null=True, blank=True)
    id = models.DecimalField(null=True, max_digits=65535, decimal_places=65535, blank=True)
    nivozone = models.CharField(max_length=254, blank=True)
    nome = models.CharField(max_length=254, blank=True)
    area = models.DecimalField(null=True, max_digits=65535, decimal_places=65535, blank=True)
    pericolo = models.CharField(max_length=254, blank=True)
    trend = models.CharField(max_length=254, blank=True)
    note = models.CharField(max_length=254, blank=True)
    data = models.DateField(null=True, blank=True)
    emissione = models.DateField(null=True, blank=True)
    objects = models.GeoManager()
    class Meta:
        db_table = 'bollettino_domani'


class BollettinoDopodomani(models.Model):
    id_0 = models.IntegerField(primary_key=True)
    geom = models.MultiPolygonField(srid=32632, null=True, blank=True)
    id = models.DecimalField(null=True, max_digits=65535, decimal_places=65535, blank=True)
    nivozone = models.CharField(max_length=254, blank=True)
    nome = models.CharField(max_length=254, blank=True)
    area = models.DecimalField(null=True, max_digits=65535, decimal_places=65535, blank=True)
    pericolo = models.CharField(max_length=254, blank=True)
    trend = models.CharField(max_length=254, blank=True)
    note = models.CharField(max_length=254, blank=True)
    data = models.DateField(null=True, blank=True)
    emissione = models.DateField(null=True, blank=True)
    objects = models.GeoManager()
    class Meta:
        db_table = 'bollettino_dopodomani'

class BollettinoOggi(models.Model):
    id_0 = models.IntegerField(primary_key=True)
    geom = models.MultiPolygonField(srid=32632, null=True, blank=True)
    id = models.DecimalField(null=True, max_digits=65535, decimal_places=65535, blank=True)
    nivozone = models.CharField(max_length=254, blank=True)
    nome = models.CharField(max_length=254, blank=True)
    area = models.DecimalField(null=True, max_digits=65535, decimal_places=65535, blank=True)
    pericolo = models.CharField(max_length=254, blank=True)
    trend = models.CharField(max_length=254, blank=True)
    note = models.CharField(max_length=254, blank=True)
    data = models.DateField(null=True, blank=True)
    emissione = models.DateField(null=True, blank=True)
    objects = models.GeoManager()
    class Meta:
        db_table = 'bollettino_oggi'
