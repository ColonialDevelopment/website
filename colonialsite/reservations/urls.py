from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^request$', views.request, name = 'request'),
    url(r'^(?P<reservation_id>[0-9]+)/$', views.view, name = 'view')
]
