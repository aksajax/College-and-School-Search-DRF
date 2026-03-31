from django.contrib import admin

# Ye lines aapke Django Admin ka look badal dengi
admin.site.site_header = "College Portal Admin"
admin.site.site_title = "College Admin"
admin.site.index_title = "Welcome to College Authentication Management"

# Kyunki hum default User use kar rahe hain, 
# isliye yahan abhi kisi model ko register karne ki zarurat nahi hai.