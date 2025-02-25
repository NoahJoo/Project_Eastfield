from django.shortcuts import render
from rest_framework.views import Response
from .models import Equipment
from .serializers import EquipmentSerializer
from rest_framework.views import APIView

from rest_framework.decorators import api_view
from rest_framework import status


# Create your views here.

#views are just the logic that handles reqs from users and determine response, data, html, json, redirect, error, etc. Make decisions based on user input

class EquipmentList(APIView):
    def get(self, request):
        equipment = Equipment.objects.all()
        serializer = EquipmentSerializer(equipment, many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
def generate_workout(request):
    selected_muscles = request.data('muscles', []) #gets muscles
    recommendations = {
        "Plan:" f"Workout Plan for {',' .join(selected_muscles)}", #dummy logic until we implement gemini API
    }
    return Response(recommendations, status=status.HTTP_200_OK) #returns response with status code 200 (basically an all good)

