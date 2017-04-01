angular.module('menuCreate').controller('DishOutputCtrl', 
	function(dishWriter){
	var self  = this;
	self.dishes = dishWriter.list;
	}
);