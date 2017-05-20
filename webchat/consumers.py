from channels.generic.websockets import JsonWebsocketConsumer


class ChatServer(JsonWebsocketConsumer):

    # Set to True if you want it, else leave it out
    strict_ordering = False

    def connection_groups(self, **kwargs):
        """
        Called to return the list of groups to automatically add/remove
        this connection to/from.
        """
        return ["test"]


    # don't really need this here for current usage.
    def connect(self, message, **kwargs):
        """
        Perform things on connection start
        """
        # Accept the connection; this is done by default if you don't override
        # the connect function.
        data = {'username': "Server", 'message': "Someone has joined!"}
        self.send(data)
        self.message.reply_channel.send({"accept": True})

    def receive(self, content, **kwargs):
        """
        Called when a message is received with decoded JSON content
        """
        print(content)
        self.send(content)

    def disconnect(self, message, **kwargs):
        """
        Perform things on connection close
        """
        pass

    # Optionally provide your own custom json encoder and decoder
    # @classmethod
    # def decode_json(cls, text):
    #     return my_custom_json_decoder(text)
    #
    # @classmethod
    # def encode_json(cls, content):
    #     return my_custom_json_encoder(content)