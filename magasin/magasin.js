// Déclaration du module 'magasin'
angular.module('ecMobileApp.magasin', [
    'ngRoute',
    'ngStorage',
    'ecMobileApp.shared'
]);

// Configuration du module 'magasin'
angular.module('ecMobileApp.magasin').config(function($routeProvider) {
    $routeProvider
		// Route panier, magasinCtrl as magasinCtrl
		.when("/panier", {
			templateUrl: "magasin/template/panier.html",
			controller: "magasinCtrl",
			controllerAs: "magasinCtrl"
		});
});

// Contrôleur principal du module 'magasin'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecMobileApp.magasin').controller('magasinCtrl', function(userService, panierService) {

    var magasinCtrl = this;

    magasinCtrl.addToPanier = function(idProduit, quantite) {
        panierService.addToPanier(idProduit, quantite);
    };
});
