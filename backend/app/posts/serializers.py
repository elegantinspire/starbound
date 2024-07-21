from rest_framework import serializers
from django.conf import settings
from .models import Post, PostImage, Category, AggregatedVisitorCount
from django.contrib.auth.models import User
from profiles.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['image', 'bio']  # Include other fields as necessary

    def get_image(self, obj):
        request = self.context.get('request')
        media_url = settings.MEDIA_URL
        if request:
            # Build the absolute URI for the media URL
            absolute_media_url = request.build_absolute_uri(media_url)
            image_url = f"{absolute_media_url}profiles/profile_images/{obj.image}"
            return image_url
        return f"{media_url}profiles/profile_images/{obj.image}"

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'profile']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image', 'alt']




class PostImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostImage
        fields = ['image', 'alt']

    def get_image(self, obj):
        request = self.context.get('request')
        image_path = f"profiles/profile_images{obj.image.url}"  # Adding specific URL segments
        if request:
            return request.build_absolute_uri(image_path)
        return image_path

class AggregatedVisitorCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AggregatedVisitorCount
        fields = ['data']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, source='user')
    category = CategorySerializer(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    featured_image = serializers.SerializerMethodField()
    aggregated_visitor_counts = AggregatedVisitorCountSerializer()

    class Meta:
        model = Post
        fields = [
            'id',
            'slug',
            'category',
            'title',
            'description',
            'author',
            'date',
            'images',
            'featured_image',
            'aggregated_visitor_counts'
        ]

    def get_featured_image(self, obj):
        request = self.context.get('request', None)
        first_image = obj.images.first()
        if first_image and request:
            return request.build_absolute_uri(first_image.image.url)
        elif first_image:
            return first_image.image.url
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        max_description_length = 250  

        if self.context.get('truncate', False):
            if len(representation['description']) > max_description_length:
                representation['description'] = representation['description'][:max_description_length] + '...'

        return representation