angular.module('menuCreate').factory('dishWriter', function() {
	var dishes = {};

	dishes.list = [];

	dishes.add = function(dish){
		dishes.list.push({id: dishes.list.length, name: dish});
	};

	return dishes;
});