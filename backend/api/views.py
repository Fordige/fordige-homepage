from rest_framework import generics
from .models import CaseModel
from .serializers import CaseSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class CaseCreateView(generics.CreateAPIView):
    queryset = CaseModel.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [AllowAny]
@csrf_exempt
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})