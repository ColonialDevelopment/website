from django.contrib import admin
from .models import Dish, Rating, MenuCategory

class DishAdmin(admin.ModelAdmin):
	fields = ['menus', 'name']
	list_display = ['name']
	list_filter = ['name']

class RatingAdmin(admin.ModelAdmin):
	fields = ['dish', 'reviewingUser', 'value']
	list_display = ['dish', 'reviewingUser', 'value']
	list_filter = ['dish', 'reviewingUser', 'value']

class MenuCategoryAdmin(admin.ModelAdmin):
	fields = ['date', 'meal', 'meal_permissions', 'category']
	list_display = ['meal', 'date']
	list_filter = ['meal', 'date']

admin.site.register(Rating, RatingAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(MenuCategory, MenuCategoryAdmin)
