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
		templateUrl: "magasin/template/magasin.tpl.html",
		controller: "magasinCtrl",
		controllerAs: "magasinCtrl"
	})
	.when("/panier", {
		templateUrl: "magasin/template/panier.tpl.html",
		controller: "panierCtrl",
		controllerAs: "panierCtrl"
	})
	.when("/detailsProduit/:id", {
		templateUrl: "magasin/template/detailsProduit.tpl.html",
		controller: "magasinCtrl",
		controllerAs: "magasinCtrl"
	})
	.when("/secure/effectuerPaiement", {
		templateUrl: "/magasin/template/effectuerPaiement.tpl.html",
		controller: "payerCtrl",
		controllerAs: "payerCtrl"
	});
});

// Contrôleur principal du module 'magasin'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecMobileApp.magasin').controller('magasinCtrl', function(userService, magasinService, panierService, $routeParams, $location) {

    var magasinCtrl = this;

    magasinCtrl.listProduits = [];

	magasinCtrl.getProduits = function(){
		magasinService.getProduits().then(function (result){
			//console.log("magasinCtrl.listProduits = result; " + result);
			magasinCtrl.listProduits = result;
		});
	};

	magasinCtrl.getProduits();

    magasinCtrl.addToPanier = function(idProduit) {
        panierService.addToPanier(idProduit, 1);
    };



	magasinCtrl.detailsProduit = function(idProduit){
		$location.path("/detailsProduit/" +idProduit);
	};

	//TODO : vérifier retour des données depuis le service

	magasinCtrl.getDetailsProduit = function(){
		magasinService.getDetailsProduit($routeParams.id).then(function (result){
		//	console.log("dans magasin.js getDetailsProduit : "+$routeParams.id);
			//console.log(result);
			magasinCtrl.detailsProduit = result;
		});
	};

	magasinCtrl.getDetailsProduit();
	//console.log("Dans magasisCtrl après le get :"+magasinCtrl.detailsProduit);
});


angular.module('ecMobileApp.magasin').controller('panierCtrl', function(userService, panierService,payerService,$location) {

	var panierCtrl = this;

	panierCtrl.totalPrix = 0;


	panierCtrl.getPanier = function(){
		panierService.getPanier().then(function (result){
			panierCtrl.panier = result;
			panierCtrl.updateTotalPanier();
		});
	};

	panierCtrl.getPanier();

	panierCtrl.updateTotalPanier = function(){
		panierCtrl.totalPrix = 0;
		panierCtrl.panier.forEach(function(produit){
			panierCtrl.totalPrix = panierCtrl.totalPrix + (produit.prix * produit.quantite);
		});
	};

	panierCtrl.diminuerQuantite = function(id_produit){
		panierCtrl.panier.forEach(function(produit){
			if(produit.id === id_produit){
				if(produit.quantite > 0){
					produit.quantite -= 1;
					panierService.addToPanier(produit.id, -1);
				}
			}
		});
		panierCtrl.updateTotalPanier();
	};

	panierCtrl.augmenterQuantite = function(id_produit){
		panierCtrl.panier.forEach(function(produit){
			if(produit.id === id_produit){
				produit.quantite += 1;
				panierService.addToPanier(produit.id, 1);
			}
		});
		panierCtrl.updateTotalPanier();
	};

    panierCtrl.removeFromPanier = function(idProduit) {
        panierService.removeFromPanier(idProduit);
        panierCtrl.getPanier();
    };

    panierCtrl.effectuerPaiement = function(totalPrix){
		payerService.setTotalPrix(totalPrix);
		$location.path("/effectuerPaiement");
	};

	this.isConnected=function(){
        return userService.isConnected();
    };
});

angular.module('ecMobileApp.magasin').controller('payerCtrl', function(userService, panierService, payerService,$location,$modal,$log) {
	var payerCtrl = this;
	payerCtrl.totalPrix = payerService.getTotalPrix();
	var typeCard = "CB";
	var typeCheque = "Chèque";

	function getPanier (){
		panierService.getPanier().then(function (result){
			payerCtrl.panier = result;
			updateTotalPanier();
		});
	}

	getPanier();

	function updateTotalPanier(){
		payerCtrl.totalPrix = 0;
		for(var i = 0; i < payerCtrl.panier.length; i++){
			payerCtrl.totalPrix = payerCtrl.totalPrix + (payerCtrl.panier[i].prix * payerCtrl.panier[i].quantite);
		}
	}

	payerCtrl.payerByCheque = function(){
		payerService.payerByCheque(userService.getInfosUser(),payerCtrl.totalPrix,payerCtrl.panier,typeCheque)
		.then(function(){
			$location.path("/");
		});
	};

	payerCtrl.save = function(form){
		if (form.$invalid) {return;}
		payerService.save(userService.getInfosUser(),payerCtrl.commande,payerCtrl.totalPrix,payerCtrl.panier,typeCard)
		.then(function(){
			$location.path("/");
		});
	};

	payerCtrl.annuler = function(){
		$location.path("/magasin");
	};

	payerCtrl.animationsEnabled = true;

	payerCtrl.open = function(size){

		var modalInstance = $modal.open({
			animation : payerCtrl.animationsEnabled,
			templateUrl : '/magasin/template/modal.html',
			controller : 'modalCtrl',
			controllerAs : 'modalCtrl',
			size: size
		});
		modalInstance.result.then(function(){
			$log.info('Modal dismissed at : ' + new Date());
		});
	};

});

angular.module('ecMobileApp.magasin').controller('modalCtrl', function( userService,payerService,$modalInstance) {
	var modalCtrl = this;
	modalCtrl.ok = function(){
		console.log("modal close");
		$modalInstance.close();
	};
});
