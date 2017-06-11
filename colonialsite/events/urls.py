from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^$', views.index, name='events_index'),
    url(r'^list/(?P<event_id>[0-9]+)/all', views.list_all, name='events_list_all'),
    url(r'^list/(?P<event_id>[0-9]+)/sophs', views.list_sophs, name='events_list_sophs'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
