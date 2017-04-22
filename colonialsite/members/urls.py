from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^api/all$', views.MemberListAll.as_view(), name = 'members_all'),
    url(r'^api/detail/(?P<netid>\w+)$', views.MemberDetail.as_view(), name = 'members_details'),
    url(r'^edit$', views.edit, name = 'members_edit'),
    # url(r'^view/(?P<netid>\w+)$', views.view, name = 'members_view'),
]
