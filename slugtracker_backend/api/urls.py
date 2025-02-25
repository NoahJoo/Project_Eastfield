from django.urls import path
from .views import EquipmentList, generate_workout 

urlpatterns = [
    path('equipment/', EquipmentList.as_view(), name='equipment-list'),
    path('workout/', generate_workout, name='workout-recommendations'),
]
#urls for api app
