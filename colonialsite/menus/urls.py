from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = "menus"

urlpatterns = [
        url(r'^create$', views.create, name='menus_create'),
        url(r'^$', views.index, name='menus_index'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

