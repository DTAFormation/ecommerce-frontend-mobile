angular.module('ecMobileApp.magasin')
.directive('ecDirectivePanier', function() {
	return {
		restrict : 'E',
		templateUrl: 'magasin/directive/myPanier.tpl.html',
		link: function(scope, element, attributes) {
			//console.log("chagement qte");
		},
		controller: function($scope) {
			//console.log("controller");
		}
	};

});