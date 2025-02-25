from django.shortcuts import render
from rest_framework.views import Response
from .models import Equipment
from .serializers import EquipmentSerializer
from rest_framework.views import APIView

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from django.http import HttpResponse

#gemini imports
import os

import google.generativeai as genai
from google.generativeai import GenerationConfig



from django.views.decorators.csrf import csrf_exempt #security measure to prevent cross site request forgery (cause why not)

# Create your views here.

#views are just the logic that handles reqs from users and determine response, data, html, json, redirect, error, etc. Make decisions based on user input
Eastfield_Equipment = [

]


# API_KEY = os.environ.get("GOOGLE_API_KEY") #use yo own api key lmao
API_KEY = "AIzaSyBS8amvlNBnCsZtYXYHBd73z3y3TjWZR4U"

genai.configure(api_key=API_KEY)


class EquipmentList(APIView):
    def get(self, request):
        equipment = Equipment.objects.all()
        serializer = EquipmentSerializer(equipment, many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
def generate_workout(request):
    selected_muscles = request.data.get('muscles', [])
    if not selected_muscles:
        return Response({"error": "Select muscles please"}, status=status.HTTP_400_BAD_REQUEST)

    sys_instruct = "You are a professional fitness trainer writing down a workout plan for a client. Your goal is to generate a workout plan using as few written characters as possible. Do not use asterisks at all"
    #^ Prepare the above b/c we can send direct using JSON format to improve UI.

    prompt = (
        f"Generate a full, bullet pointed workout plan for {', '.join(selected_muscles)} based on the following equipment "
        f"available at the gym: {', '.join(Eastfield_Equipment)}."
    )

    full_prompt = f"{sys_instruct}\n\n{prompt}"

    generation_config = GenerationConfig(
        temperature=0.5,
        top_p=0.9,
        top_k=40
    )
            #temp - argmax sampling , adjusts probability distributio of answers. high = confident, low = random
            #top_p - nucleus sampling, only consider top p% of prob mass.
            #top_k - k most probable tokens & redistributes probability mass among them. basically only top k tokens are considered
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        reply = model.generate_content(
            full_prompt,
            generation_config=generation_config,
        )

        recommendations = reply.text

        if reply.prompt_feedback and reply.prompt_feedback.block_reason:
            return Response({"error": "Model blocked"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"plan": recommendations}, status=status.HTTP_200_OK) #RETURNS JSON FUCK ME. JSON KEYS HAVE TO BE EXACT AND ARE CASE SENSITIVE

    except Exception as e:
        print(f"Error generating workout: {e}")
        return Response({"error": f"Error generating workout: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

generate_workout = csrf_exempt(generate_workout)