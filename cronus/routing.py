from channels.routing import route, route_class

import webchat.consumers as consumers

channel_routing = [
    route_class(consumers.ChatServer, path=r"^/chat/")
]