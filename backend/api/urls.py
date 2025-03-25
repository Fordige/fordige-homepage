from django.urls import path
from .views import CaseCreateView

urlpatterns = [
    path('create-case/', CaseCreateView.as_view()),
]
