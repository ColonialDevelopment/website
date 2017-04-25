from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.MemberListAll.as_view(), name = 'members_all'),
    url(r'^detail/(?P<netid>\w+)$', views.MemberDetail.as_view(), name = 'members_details'),
]
