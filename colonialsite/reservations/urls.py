from django.conf.urls import url
from .views import ReservationMonthView, ReservationDayView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^$', views.index, name='reservations_index'),
    url(r'^request$', views.request, name = 'reservations_request'),
    url(r'^confirmation/(?P<reservation_id>[0-9]+)$', views.confirmation, name = 'reservations_confirmation'),

    #ex. /reservations/view/1
    url(r'^view/(?P<reservation_id>[0-9]+)$', views.view, name = 'reservations_view'),

    #ex. /reservations/2016/04
    url(r'^(?P<year>[0-9]{4})/(?P<month>[0-9]+)/$', ReservationMonthView.as_view(month_format='%m'),
        name="reservations_archive_month"),

    #ex. /reservations/2016/04/21
    url(r'^(?P<year>[0-9]{4})/(?P<month>[0-9]+)/(?P<day>[0-9]+)/$', ReservationDayView.as_view(month_format='%m'),
        name="reservations_archive_day"),

    url(r'^test$', views.ReservationList.as_view()),
    url(r'^test/(?P<pk>[0-9]+)$', views.ReservationDetail.as_view()),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
