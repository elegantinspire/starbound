from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import action
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Max, IntegerField

from .models import Post, VisitorCount, AggregatedVisitorCount
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination

class PostPagination(PageNumberPagination):
    page_size_query_param = 'pageSize'
    page_query_param = 'page'

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request, 'truncate': True})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request, 'truncate': True})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        posts = Post.objects.order_by('-date')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request, 'truncate': True})
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True, context={'request': request, 'truncate': True})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        posts = Post.objects.annotate(
            visitor_sum=Sum('aggregated_visitor_counts__data__all_time_count', output_field=IntegerField())
        ).order_by('-visitor_sum')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request, 'truncate': True})
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True, context={'request': request, 'truncate': True})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def trending(self, request):
        three_months_ago = timezone.now() - timedelta(days=90)
        trending_counts = VisitorCount.objects.filter(date__gte=three_months_ago).values('post').annotate(visitor_sum=Sum('count'), latest_date=Max('date')).order_by('-visitor_sum')
        trending_post_ids = [count['post'] for count in trending_counts]
        trending_posts = Post.objects.filter(id__in=trending_post_ids).annotate(latest_date=Max('visitor_counts__date')).order_by('-latest_date')
        page = self.paginate_queryset(trending_posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request, 'truncate': True})
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(trending_posts, many=True, context={'request': request, 'truncate': True})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def increment_visitor_count(self, request, pk=None):
        post = self.get_object()
        count = post.visitor_counts.first()  # Assuming one visitor count entry per post
        if count:
            count.count += 1
            count.save()
        else:
            VisitorCount.objects.create(post=post, count=1)
        return Response({'status': 'visitor count incremented'})

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        filter_kwargs = {self.lookup_field: self.kwargs[self.lookup_field]}
        obj = generics.get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)
        return obj

    def handle_exception(self, exc):
        if isinstance(exc, NotFound):
            return Response({'detail': 'No Post matches the given query.'}, status=status.HTTP_404_NOT_FOUND)
        return super().handle_exception(exc)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
