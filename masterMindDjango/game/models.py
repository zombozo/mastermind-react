from django.db import models

# Create your models here.

app_name = "game"
class gameModel(models.Model):
    combinacionSecreta = models.TextField(("[]"))
    