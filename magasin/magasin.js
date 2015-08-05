// Déclaration du module 'magasin'
angular.module('ecMobileApp.magasin', [
    'ngRoute',
    'ecMobileApp.shared',
    'ngStorage'
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
angular.module('ecMobileApp.magasin').controller('magasinCtrl', function(userService, magasinService) {

	var magasinCtrl = this;

	magasinCtrl.quantite = 1;

	function getProduits (){
		magasinService.getProduits().then(function (result){
			console.log("magasinCtrl : " + result);
			//magasinCtrl.listProduits = result.data;
		});
	}

	getProduits();

});


angular.module('ecMobileApp.magasin').controller('panierCtrl', function(userService, magasinService) {

	var panierCtrl = this;

	panierCtrl.quantite = 1;

	function getPanier (){
		magasinService.getPanier().then(function (result){
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