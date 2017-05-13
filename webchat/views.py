from django.shortcuts import render

# Create your views here.
from webchat.models import *


def index(request):

    if request.method == 'POST':
        owner = request.POST.get('username')
        message_text = request.POST.get('message')
        message = Message(owner=owner, message = message_text)
        message.save()

    return render(request, "webchat/index.html")


def conversation(request):

    convo = Message.objects.all()

    context = {'convo': convo}

    return render(request, "webchat/conversation.html", context)

