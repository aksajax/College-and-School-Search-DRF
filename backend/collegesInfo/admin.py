from django.contrib import admin
from .models import College

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    # Admin ki list mein ye saare columns dikhenge
    list_display = ('name', 'state', 'city', 'ranking', 'created_at')
    
    # Side mein filter box aayega (State ke basis par filter karna aasaan hoga)
    list_filter = ('state', 'city', 'ranking')
    
    # Search bar in columns par kaam karega
    search_fields = ('name', 'state', 'city')
    
    # Ranking ko list se hi edit karne ki permission (Optional)
    list_editable = ('ranking',)
    
    # Default sorting (Pahle top ranking wale colleges dikhen)
    ordering = ('ranking',)