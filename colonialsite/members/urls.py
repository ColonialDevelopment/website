from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^viewall$', views.MemberListAll.as_view(), name = 'members_all'),
    url(r'^api/detail/(?P<pk>[0-9]+)$', views.MemberDetail.as_view(), name = 'members_details'),
]
