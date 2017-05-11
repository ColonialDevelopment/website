from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
     # Urls for rest api
    url(r'^$', views.AnnouncementListAll.as_view(), name = 'announcements_all'),
    url(r'^detail/(?P<pk>[0-9]+)$', views.AnnouncementDetail.as_view(), name = 'announcements_detail'),
    url(r'^post', views.AnnouncementPost.as_view(), name = 'announcements_post')
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
