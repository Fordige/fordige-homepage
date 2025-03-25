from rest_framework import generics
from .models import CaseModel
from .serializers import CaseSerializer

# Create your views here.
class CaseCreateView(generics.CreateAPIView):
    queryset = CaseModel.objects.all()
    serializer_class = CaseSerializer

    