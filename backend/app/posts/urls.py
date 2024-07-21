# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, PostRetrieveUpdateDestroy

router = DefaultRouter()
router.register(r'', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('s/<slug:slug>/', PostRetrieveUpdateDestroy.as_view(), name='post-detail'),
    path('popular/', PostViewSet.as_view({'get': 'popular'}), name='post-popular'),
    path('trending/', PostViewSet.as_view({'get': 'trending'}), name='post-trending'),
    path('latest/', PostViewSet.as_view({'get': 'latest'}), name='post-latest'),
    path('<int:pk>/increment/', PostViewSet.as_view({'post': 'increment_visitor_count'}), name='post-increment-visitor-count'),
    path('update-aggregate-counts/', PostViewSet.as_view({'post': 'update_aggregate_counts'}), name='update-aggregate-counts'),
]
