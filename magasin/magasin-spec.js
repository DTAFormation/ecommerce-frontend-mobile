describe("Test du magasinCtrl", function() {

    beforeEach(function() {
		module("ecMobileApp.magasin");
	});

	it("Récupérer tous les produits", inject(function($controller, $localStorage) {
		var magasinCtrl = $controller("magasinCtrl");
		magasinCtrl.panier = [];
		magasinCtrl.getProduits();
		for(var i=0; i<magasinCtrl.panier.length ; i++){
			expect($localStorage.panier[i].idProduit).toEqual(magasinCtrl.panier[i].id);
			expect($localStorage.panier[i].quantite).toEqual(magasinCtrl.panier[i].quantite);
		}
	}));

});
