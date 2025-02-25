from django.db import models

# Create your models here.
class Equipment(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField()
    muscles = models.CharField(max_length=255)

    def __str__(self):
        return self.name