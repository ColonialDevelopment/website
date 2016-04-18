from django.conf.urls import url

from . import views

app_name = 'coloauth'
urlpatterns = [
    url(r'^login', views.login_page, name='login_page'),
    url(r'^logout', views.logout_page, name='logout_page'),
    url(r'^register', views.register, name='register'),
]