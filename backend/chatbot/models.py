# from django.db import models

# class ChatSession(models.Model):
#     session_id = models.CharField(max_length=100, unique=True)
#     group_id = models.CharField(max_length=100, default=None, null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.session_id} -> {self.group_id or 'no_group'}"

#     class Meta:
#         db_table = "chatbot_chatsession"