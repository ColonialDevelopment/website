from django.contrib import admin
from .models import Menu, Dish, Rating

class MenuAdmin(admin.ModelAdmin):
    fields = ['date', 'meal', 'meal_permissions']
    list_display = ['date', 'meal']
    list_filter = ['date', 'meal']
    search_fields = ['date', 'meal']

class DishAdmin(admin.ModelAdmin):
	fields = ['menus', 'name']
	list_display = ['name']
	list_filter = ['name']
	search_fields = ['name']

class RatingAdmin(admin.ModelAdmin):
	fields = ['dish', 'reviewingUser', 'value']
	list_display = ['dish', 'reviewingUser', 'value']
	list_filter = ['dish', 'reviewingUser', 'value']
	search_fields = ['dish', 'reviewingUser']

admin.site.register(Rating, RatingAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Menu, MenuAdmin)
