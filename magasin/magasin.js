// Déclaration du module 'magasin'
angular.module('ecMobileApp.magasin', [
    'ngRoute',
    'ngStorage',
    'ecMobileApp.shared'
]);

// Configuration du module 'magasin'
angular.module('ecMobileApp.magasin').config(function($routeProvider) {

	$routeProvider
	.when("/magasin", {
		templateUrl: "/magasin/template/magasin.tpl.html",
		controller: "magasinCtrl",
		controllerAs: "magasinCtrl"
	})
	.when("/panier", {
		templateUrl: "/magasin/template/panier.tpl.html",
		controller: "panierCtrl",
		controllerAs: "panierCtrl"
	});
});

// Contrôleur principal du module 'magasin'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecMobileApp.magasin').controller('magasinCtrl', function(userService, magasinService, panierService) {

    var magasinCtrl = this;

	function getProduits (){
		magasinService.getProduits().then(function (result){
			console.log("magasinCtrl : " + result);
			//magasinCtrl.listProduits = result.data;
		});
	}

	getProduits();

    magasinCtrl.addToPanier = function(idProduit, quantite) {
        panierService.addToPanier(idProduit, quantite);
    };
});


angular.module('ecMobileApp.magasin').controller('panierCtrl', function(userService, panierService) {

	var panierCtrl = this;

	panierCtrl.quantite = 1;

	function getPanier (){
		panierService.getPanier().then(function (result){
			//panierCtrl.panier = result.data;
		});
	}

	panierCtrl.diminuerQuantite = function (){
		panierCtrl.quantite -= 1;
	};

	panierCtrl.augmenterQuantite = function (){
		panierCtrl.quantite += 1;
	};

});
