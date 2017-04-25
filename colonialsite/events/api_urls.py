from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
     # Urls for rest api
    url(r'^$', views.EventListAll.as_view(), name = 'events_all'),
    url(r'^detail/(?P<pk>[0-9]+)$', views.EventDetail.as_view(), name = 'events_detail'),
    url(r'^(?P<event_id>[0-9]+)/rsvp$', views.rsvp, name = 'events_rsvp'),
    url(r'^(?P<event_id>[0-9]+)/cancel$', views.cancel, name = 'events_cancel'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
