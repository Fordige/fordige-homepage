from django.contrib import admin
from api.models import CaseModel

class CaseModelAdmin(admin.ModelAdmin):
    list_display = ['case_id', 'case_title', 'created_dt', 'finished_dt', 'price', 'user_id', 'user_line_id', 'email']

# Register your models here.
admin.site.register(CaseModel, CaseModelAdmin)
