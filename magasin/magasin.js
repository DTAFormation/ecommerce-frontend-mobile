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
		templateUrl: "magasin/template/effectuerPaiement.tpl.html",
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
			magasinCtrl.produitSelectionne = result;
		});
	};

	magasinCtrl.getDetailsProduit();
});


angular.module('ecMobileApp.magasin').controller('panierCtrl', function(userService, panierService,payerService,$location,$route) {

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
		$location.path("/secure/effectuerPaiement");
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
		});
	}

	getPanier();
	
	payerCtrl.modal = function(){
		var modalInstance = $modal.open({
				animation : payerCtrl.animationsEnabled,
				templateUrl : '/magasin/template/modalValidation.html',
				controller : 'modalCtrl',
				controllerAs : 'modalCtrl',
			});
	};

	payerCtrl.payerByCheque = function(){
		payerService.payerByCheque(userService.getInfosUser(),payerCtrl.totalPrix,payerCtrl.panier,typeCheque)
		.then(function(){
			payerCtrl.modal();
		});
	};

	payerCtrl.save = function(form){
		if (form.$invalid) {return;}
		payerService.save(userService.getInfosUser(),payerCtrl.commande,payerCtrl.totalPrix,payerCtrl.panier,typeCard)
		.then(function(){
			payerCtrl.modal();
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
			controller : 'modal2Ctrl',
			controllerAs : 'modal2Ctrl',
			size: size
		});
	};

});

angular.module('ecMobileApp.magasin').controller('modalCtrl', function( userService,payerService,$modalInstance,$location) {
	var modalCtrl = this;
	modalCtrl.ok = function(){
		$modalInstance.close();
		$location.path("/");

	};
});

angular.module('ecMobileApp.magasin').controller('modal2Ctrl', function( userService,payerService,$modalInstance,$location) {
	var modal2Ctrl = this;
	modal2Ctrl.ok = function(){
		$modalInstance.close();
	};
});