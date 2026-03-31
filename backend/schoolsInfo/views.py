from rest_framework import viewsets, filters
from .models import School
from .serializers import SchoolSerializer

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    filter_backends = [filters.SearchFilter]
    # In fields par search kaam karega
    search_fields = ['name', 'city', 'state']