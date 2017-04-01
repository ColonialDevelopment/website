angular.module('menuCreate').controller('DishInputCtrl', function(dishWriter){
	var self = this;

	self.addDish = function(dish){
		dishWriter.add(dish);
		self.newDish = '';
	};
});