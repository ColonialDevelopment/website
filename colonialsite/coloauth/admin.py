from django.contrib import admin
from django.contrib.auth.models import Permission
from django.contrib.admin.models import LogEntry

# Register your models here.
admin.site.register(Permission)
admin.site.register(LogEntry)