Version: 0.01 
7/24/16
#Menus app 
By: Andrew Ruchames '17

The menus app consists of two main parts.

The Menu Editor: to be used by admins to create menus for the days and weeks ahead.

The menu editor requires several angular modules in order to make a responsive experience.
1. The dish input module sends a request to the service for a list of dishes that start with the first letter typed. We also need to consider handling overwriting a previous meal in this module. This sets us up for the...
2. Autocomplete module will display the dishes that match the currently inputted dish and if nothing matches will say Create New Dish in the box underneath. The dishes that are suggested will be displayed with their average user rating.
3. The DishDisplay module will take input from the dish submission service and will gracefully display the dish in the mockup menu. We will also need to consider how the page handles refreshing.
4. Meal submit, send a signal to the dishDisplay module that we need to write in the next meal.
5. Dish submit, send a signal to the dishDisplay module that we need to write in the next dish.
6. Send the finished, formatted menu to the service and return a preview of the menu as it will be displayed on the final website.

The Menu Viewer: user facing product for consuming menus, rating meals and browsing the most popular meals. (also beneficial for the chef as meal ratings become more reliable.)

1. The menu viewer will display the current day's menu by default and will have an intuitive UI for browsing future and previous menus. On the home page it will display just the next meal, but on the menus page it will display the whole day in half screen mode and the next two days in fullscreen.
2. The menu viewer will make a service request to get the day's menu. It will display the first meal on the home page, but already have the next meal loaded, so that the transition will be seamless.
3. The menu viewer will also have a rating input mechanism, a little star that you click on that brings up an overlay with 5 larger stars so that the interface is usable on mobile. On desktop it will just expand into 5 stars where you click on one and the stars fill up to that point.
