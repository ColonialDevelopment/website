from django.conf.urls import url
from views import MenuCategoryByDate

urlpatterns = [
    url(r'^$', MenuCategoryByDate.as_view(), name = 'menus_by_date'),
]
