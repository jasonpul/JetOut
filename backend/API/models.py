from django.db import models

# Create your models here.


class Keyword(models.Model):
    keyword = models.CharField(max_length=200)


class Image(models.Model):
    keyword = models.ForeignKey(Keyword, on_delete=models.CASCADE, related_name='images')
    url = models.URLField()