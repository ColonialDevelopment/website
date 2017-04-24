from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^$', views.index, name='events_index'),

     # Urls for rest api
    url(r'^api$', views.EventListAll.as_view(), name = 'events_all'),
    url(r'^api/detail/(?P<pk>[0-9]+)$', views.EventDetail.as_view(), name = 'events_detail'),
    url(r'^api/(?P<event_id>[0-9]+)/rsvp$', views.rsvp, name = 'events_rsvp'),
    url(r'^api/(?P<event_id>[0-9]+)/cancel$', views.cancel, name = 'events_cancel'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
