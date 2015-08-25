angular.module('ecMobileApp.magasin')
.directive('ecDirectivePanier', function() {
	return {
		restrict : 'E',
		templateUrl: 'magasin/directive/myPanier.tpl.html',
		link: function(scope, element, attributes) {
			scope.produit = scope.$eval(attributes.ngProduit); //attributes contient les données de {{produit}}
		},
		controller: function($scope) {
			console.log("controller");
		}
	};

});