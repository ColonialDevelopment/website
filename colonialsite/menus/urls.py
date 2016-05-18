from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from . import views
from rest_framework import routers
from menus import views

app_name = "menus"

router = routers.DefaultRouter()
router.register(r'menus', views.MenuViewSet)
router.register(r'dishes', views.DishViewSet)
router.register(r'ratings', views.RatingViewSet)


urlpatterns = [
        url(r'^$', views.index, name='menus_index'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

