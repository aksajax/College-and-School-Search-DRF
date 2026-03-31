from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer
User = get_user_model()
# 1. Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Sabko access hai register karne ka
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Register hote hi user ko tokens mil jayenge (Optional but Professional)
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "User Created Successfully"
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 2. Logout View (Token Blacklisting)
# Note: Iske liye settings.py mein 'rest_framework_simplejwt.token_blacklist' add karna hoga
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist() # Token invalid kar deta hai server side par
            return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    # Isse sirf wahi access kar payega jiske paas valid token ho
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Hum user ka data Serializer ke through bhejenge
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)