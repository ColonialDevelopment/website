from django.conf.urls import url

from . import views

app_name = 'auth'
urlpatterns = [
    url(r'^login$', views.IndexView.as_view(), name='index'),
]
