from django.db import models

# Create your models here.


class Message(models.Model):
    owner = models.CharField(max_length=64)
    message = models.TextField()
