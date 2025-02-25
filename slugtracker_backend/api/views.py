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


# API_KEY = os.environ.get("AIzaSyBS8amvlNBnCsZtYXYHBd73z3y3TjWZR4U") #use yo own api key lmao
API_KEY = "AIzaSyBS8amvlNBnCsZtYXYHBd73z3y3TjWZR4U"

genai.configure(api_key=API_KEY)


class EquipmentList(APIView):
    def get(self, request):
        equipment = Equipment.objects.all()
        serializer = EquipmentSerializer(equipment, many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
def generate_workout(request):
    selected_muscles = request.data.get('muscles', []) #gets muscles
    if not selected_muscles:
        return Response({"error": "select muscles pls"})
    

    sys_instruct = "you are santa clause" #system instructions for AI, switch sys and prompt
    prompt = (
        f"You are a professional fitness trainer and you do not need to introduce yourself "
        f"or workout concepts because you are well acquainted with the user."
        f"ONLY Generate a full workout plan for {','.join(selected_muscles)} based on the following equipment "
        f"available at the gym: {','.join(Eastfield_Equipment)}."
    )
    #was returning undetermined string literal error thats y f strings r there

    generation_config = GenerationConfig(
        temperature = 0.5,
        system_instructions=sys_instruct,
        top_p=0.9,
        top_k=40
    )

    try:

        model = genai.GenerativeModel('gemini-2.0-flash')
        reply = model.generate_content(
            prompt,
            temperature=0.5
            )
        """
        reply = model.generate_content(
            prompt,
            system_instructions = sys_instruct,
            temperature = 0.5,
            top_p = 0.9,
            top_k = 40,
        )"""
                    #temp - argmax sampling , adjusts probability distributio of answers. high = confident, low = random
                    #top_p - nucleus sampling, only consider top p% of prob mass. 
                    #top_k - k most probable tokens & redistributes probability mass among them. basically only top k tokens are considered
        recommendations = reply.text
        if reply.prompt_feedback and reply.prompt_feedback.block_reason:
            return Response({"error": "model blocked"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        """recommendations = {
            "Plan:" f"Workout Plan for {',' .join(selected_muscles)}", #dummy logic until we implement gemini API
        }"""
        return Response(recommendations, status=status.HTTP_200_OK) #returns response with status code 200 (basically an all good)
    except Exception as e:
        print(f"Error generating workout: {e}")
        return Response({f"Error generating workout:", " {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) #returns response with status code 500 (internal server error)

generate_workout = csrf_exempt(generate_workout) #csrf_exempt decorator to disable csrf protection for this view. prevents cross site request forgery

