from django.conf.urls import url
from .views import ReservationMonthView, ReservationDayView

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^request$', views.request, name = 'request'),
    url(r'^confirmation$', views.confirmation, name = 'confirmation'),
    
    #ex. /reservations/view/1
    url(r'^view/(?P<reservation_id>[0-9]+)$', views.view, name = 'view'),

    #ex. /reservations/2016/04
    url(r'^(?P<year>[0-9]{4})/(?P<month>[0-9]+)/$', ReservationMonthView.as_view(month_format='%m'),
        name="archive_month"),

    #ex. /reservations/2016/04/21
    url(r'^(?P<year>[0-9]{4})/(?P<month>[0-9]+)/(?P<day>[0-9]+)/$', ReservationDayView.as_view(month_format='%m'),
        name="archive_day"),
    
]
