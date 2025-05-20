from django.contrib import admin
from api.models import CaseModel

class CaseModelAdmin(admin.ModelAdmin):
    list_display = ['case_id', 'case_title', 'created_dt', 'finished_dt', 'name', 'line_id', 'email', 'budget', 'service', 'price' ]

# Register your models here.,
admin.site.register(CaseModel, CaseModelAdmin)
