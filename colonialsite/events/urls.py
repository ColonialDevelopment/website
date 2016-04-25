from django.conf.urls import url

from . import views

app_name="colo_events"
urlpatterns = [
    url(r'^$', views.index, name='events_index'),
    #url(r'^list', views.list, name="events_list"),
    #url(r'^(?P<year>[0-9]{4})/(?P<month>[0-9]+)/$', EventsMonthView.as_view(month_format='%m'),
    #    name="events_archive_month"),
    #url(r'^view/(?P<reservation_id>[0-9]+)$', views.view, name='events_view'),
]
