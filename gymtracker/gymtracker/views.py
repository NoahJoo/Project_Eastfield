from django.http import HttpResponse
from django.shortcuts import render
#lets you render HTML files

#function to recieve request for homepage from urls.py and about.
def homepage(request):
    # return HttpResponse("Hello World! Homepage test")
    return render(request, 'home.html')

def about(request):
    # return HttpResponse("My About Page.")
    return render(request, 'about.html')

