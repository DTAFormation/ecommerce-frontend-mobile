describe("Test des controllers du module magasin", function() {

	var mockProduits = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"}];

	var mockPromise =  {
					then : function(fn) {
						fn(mockProduits);
					}};

    beforeEach(function() {
		module("ecMobileApp.magasin");
		//module('testUtils');
	});  


	it("magasinCtrl : Récupérer tous les produits", inject(function($controller, $httpBackend, magasinService/*, mockUtils*/) {
		   
		/* var magasinCtrl = $controller("magasinCtrl", { magasinService: {
			getProduits : function(){ 
				return {
					then : function(fn) {
						fn(mockProduits);
					}
				};
			}
		}}); */

		//spyOn(magasinService, "getProduits").and.returnValue(mockUtils.mockPromiseProduits);
		spyOn(magasinService, "getProduits").and.returnValue(mockPromise);
		var magasinCtrl = $controller("magasinCtrl");
		expect(magasinCtrl.listProduits.length).toEqual(2);
		expect(magasinCtrl.listProduits[0]).toEqual({id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"});
		expect(magasinCtrl.listProduits[1]).toEqual({id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"});
	}));

	/*it("panierCtrl : Récupérer tous les produits du panier", inject(function($controller, $localStorage){
		var panierCtrl = $controller("panierCtrl");
		panierCtrl.panier = [];
		panierCtrl.getPanier();
		console.log(panierCtrl.panier);
		for(var i=0; i<panierCtrl.panier.length ; i++){
			expect($localStorage.panier[i].idProduit).toEqual(panierCtrl.panier[i].id);
			expect($localStorage.panier[i].quantite).toEqual(panierCtrl.panier[i].quantite);
		}
	}));*/

});
