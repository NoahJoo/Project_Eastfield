from rest_framework import serializers #to build web api. converts complex data types to native python data type. part of rest framework
from .models import Equipment

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ['id', 'name', 'description', 'muscles'] #serialized fields, so fields that are converted to JSON