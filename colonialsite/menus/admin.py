from django.contrib import admin
from .models import Dish, Rating, MenuCategory

class DishAdmin(admin.ModelAdmin):
	#fields = '__all__'
	list_display = ['name']
	list_filter = ['name']
	search_fields = ['name']

class RatingAdmin(admin.ModelAdmin):
	fields = ['dish', 'reviewingUser', 'value']
	readonly_fields = '__all__'
	list_display = ['dish', 'reviewingUser', 'value']
	list_filter = ['dish', 'reviewingUser', 'value']
	search_fields = ['dish', 'reviewingUser']

class MenuCategoryAdmin(admin.ModelAdmin):
	fields = ['date', 'meal', 'meal_permissions', 'category']
	list_display = ['date', 'meal', 'category']
	list_filter = ['date', 'meal', ]

admin.site.register(Rating, RatingAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(MenuCategory, MenuCategoryAdmin)
