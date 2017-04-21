from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/all$', views.MemberListAll.as_view(), name = 'members_all'),
    url(r'^api/detail/(?P<netid>[a-z]+)$', views.MemberDetail.as_view(), name = 'members_details'),
]
