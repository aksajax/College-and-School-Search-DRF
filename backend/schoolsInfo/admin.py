from django.contrib import admin
from .models import School

@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'board', 'rating')
    list_filter = ('board', 'state', 'is_private')
    search_fields = ('name', 'city')