from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Permission, User
from django.contrib.admin.models import LogEntry

class CustomUserAdmin(UserAdmin):
    def __init__(self, *args, **kwargs):
        super(UserAdmin, self).__init__(*args, **kwargs)
        UserAdmin.list_display = list(UserAdmin.list_display) + ['permissions']

    def permissions(self, obj):
        return ', '.join([p.name for p in obj.user_permissions.all()])

# Register your models here.
admin.site.register(Permission)
admin.site.register(LogEntry)
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
