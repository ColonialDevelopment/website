from django.conf.urls import url
from . import views

urlpatterns = [    
    url(r'^edit$', views.edit, name = 'members_edit'),
]
