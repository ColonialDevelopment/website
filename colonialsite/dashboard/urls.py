from django.conf.urls import url

from . import views

app_name = "dashboard"

urlpatterns = [
        url(r'^$', views.index, name='dashboard-index'),
]
