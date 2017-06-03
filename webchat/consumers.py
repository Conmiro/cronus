import json

from channels.generic.websockets import JsonWebsocketConsumer
from channels import Group

class ChatServer(JsonWebsocketConsumer):

    # Set to True if you want it, else leave it out
    strict_ordering = False

    # called when the socket is created
    def connect(self, message, **kwargs):
        data = {'username': "Server", 'message': "Someone has joined!"}
        self.message.reply_channel.send({"accept": True})
        Group("chat").add(self.message.reply_channel)
        Group("chat").send({'text': json.dumps(data)})

    # called when a message is sent from client
    def receive(self, content, **kwargs):
        # send to all clients in this group (aka ChatServer)
        Group("chat").send({'text': json.dumps(content)})



