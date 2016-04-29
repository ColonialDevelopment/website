from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^$', views.index, name='events_index'),
    url(r'^create$', views.create, name = 'events_create'),
    #ex. /events/view/1
    url(r'^view/(?P<event_id>[0-9]+)$', views.view, name = 'events_view'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
