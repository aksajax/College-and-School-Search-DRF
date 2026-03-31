from rest_framework import filters

from rest_framework import viewsets
from .models import College
from .serializers import CollegeSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    # Koi bhi dekh sake, lekin sirf admin edit kar sake
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [filters.SearchFilter]
    # In fields par search kaam karega
    search_fields = ['name', 'city', 'state']