import random
import string
from django.db import models

def generate_case_id():
    return ''.join(random.choice(string.ascii_letters) for _ in range(2)) + ''.join(random.choice(string.digits ) for _ in range(5))

class CaseModel(models.Model):
    case_id = models.CharField(
        max_length=10,
        unique=True,
        default=generate_case_id,
        editable=False,  
    )
    case_title = models.CharField(max_length=100, null=True, blank=True)
    case_description = models.TextField(null=True, blank=True)
    case_record = models.TextField(null=True, blank=True)  
    created_dt = models.DateTimeField(auto_now_add=True)  
    finished_dt = models.DateTimeField(null=True, blank=True)  
    price = models.IntegerField(default=0)
    user_id = models.CharField(max_length=100)
    user_line_id = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return f"{self.case_id} - {self.case_title}"

    class Meta:
        ordering = ['-created_dt']  # 按建立時間降序排列
        verbose_name_plural = 'cases'