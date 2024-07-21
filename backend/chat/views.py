# views.py

from rest_framework import generics, status
from rest_framework.response import Response
from django.http import Http404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import os
import json
from system.settings import BASE_DIR
from .serializers import ConversationDetailSerializer, ConversationSerializer, MessageSerializer

CONVERSATION_DIR = os.path.join(BASE_DIR, 'chat', 'storage', 'conversations')

@method_decorator(csrf_exempt, name='dispatch')
class ConversationListView(generics.ListAPIView):
    serializer_class = ConversationSerializer

    def get_queryset(self):
        conversations = []
        for filename in os.listdir(CONVERSATION_DIR):
            if filename.endswith('.json'):
                with open(os.path.join(CONVERSATION_DIR, filename), 'r') as file:
                    conversation_data = json.load(file)
                    conversations.append({
                        'id': int(filename.split('.')[0]),  # Extract chat ID from filename
                        'title': conversation_data.get('title', ''),
                        'participants': conversation_data.get('participants', [])
                    })
        return conversations


@method_decorator(csrf_exempt, name='dispatch')
class ConversationDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ConversationDetailSerializer

    def get_object(self):
        conversation_id = self.kwargs.get('pk')
        filename = os.path.join(CONVERSATION_DIR, f"{conversation_id}.json")
        
        if not os.path.exists(filename):
            raise Http404("Conversation does not exist")
        
        with open(filename, 'r') as file:
            conversation_data = json.load(file)
        
        return conversation_data

    def put(self, request, *args, **kwargs):
        conversation_id = self.kwargs.get('pk')
        filename = os.path.join(CONVERSATION_DIR, f"{conversation_id}.json")

        try:
            with open(filename, 'r') as file:
                conversation_data = json.load(file)
        except FileNotFoundError:
            raise Http404("Conversation does not exist")
        
        # Update or create new messages in the conversation
        new_message_data = request.data
        if new_message_data:
            # Deserialize message data
            serializer = MessageSerializer(data=new_message_data)
            if serializer.is_valid():
                message = {
                    'id': new_message_data.get('id'),
                    'sender': new_message_data.get('sender'),
                    'content': new_message_data.get('content'),
                    'timestamp': new_message_data.get('timestamp'),
                }
                # Append new message to existing messages
                conversation_data.setdefault('messages', []).append(message)
                # Save updated conversation data back to JSON file
                with open(filename, 'w') as file:
                    json.dump(conversation_data, file, indent=4)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "No message data provided."}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance=instance)
        return Response(serializer.data)