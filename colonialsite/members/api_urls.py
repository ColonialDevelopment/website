from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.MemberListAll.as_view(), name = 'members_all'),
    url(r'^detail/(?P<netid>\w+)$', views.MemberDetail.as_view(), name = 'members_details'),
    url(r'^bio$', views.post_bio, name = 'members_post_bio'),
    url(r'^bday$', views.post_bday, name = 'members_post_bday'),
    url(r'^name$', views.post_name, name = 'members_post_name'),
]
