from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LogoutView, UserProfileView

urlpatterns = [
    # Login (JWT Token generate karega)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Token refresh karne ke liye (Jab access token expire ho jaye)
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Registration
    path('register/', RegisterView.as_view(), name='auth_register'),
    
    # Logout
    path('logout/', LogoutView.as_view(), name='auth_logout'),

    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
]