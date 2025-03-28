from django.urls import path
from .views import CaseCreateView, get_csrf_token

urlpatterns = [
    path('create-case/', CaseCreateView.as_view()),
    path('get-csrf-token/', get_csrf_token),
]
