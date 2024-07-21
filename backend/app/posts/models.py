from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.URLField()

    class Meta:
        db_table = 'app_post_category'

    def __str__(self):
        return self.name

class Post(models.Model):
    slug = models.SlugField(max_length=200, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return self.title

class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/')
    alt = models.CharField(max_length=200)

    class Meta:
        db_table = 'app_post_image'

    def __str__(self):
        return f"Image for {self.post.title}"

class VisitorCount(models.Model):
    post = models.ForeignKey(Post, related_name='visitor_counts', on_delete=models.CASCADE)
    count = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'app_post_visitor_count'

    def __str__(self):
        return f"Visitor count for {self.post.title} on {self.date}"

class AggregatedVisitorCount(models.Model):
    post = models.ForeignKey(Post, related_name='aggregated_visitor_counts', on_delete=models.CASCADE)
    data = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'app_aggregated_visitor_count'

    def __str__(self):
        return f"Aggregated visitor count for {self.post.title}"
