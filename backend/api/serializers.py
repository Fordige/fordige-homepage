from rest_framework import serializers
from .models import CaseModel

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseModel
        fields = "__all__"
        read_only_fields = ['case_id', 'created_dt']