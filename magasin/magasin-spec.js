describe("Test des controllers du module magasin", function() {

	var mockProduits = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"}];

	var mockPromise =  {
		then : function(fn) {
			fn(mockProduits);
		}
	};

	var mockPanier = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120", quantite : 2}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120", quantite : 2}];

	var mockLocalStorage = {"1" : 2, "2" : 2};

	var mockPromisePanier = {
		then : function(fn){
			fn(mockPanier);
		}
	};

	var mockRemovedPanier = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120", quantite : 2}];

	var mockPromiseRemovedPanier = {
		then : function(fn){
			fn(mockRemovedPanier);
		}
	};

    beforeEach(function() {
		module("ecMobileApp.magasin");
		//module('testUtils');
	});  


	it("magasinCtrl : Récupérer tous les produits", inject(function($controller, magasinService/*, mockUtils*/) {

		//spyOn(magasinService, "getProduits").and.returnValue(mockUtils.mockPromiseProduits);
		spyOn(magasinService, "getProduits").and.returnValue(mockPromise);
		var magasinCtrl = $controller("magasinCtrl");
		expect(magasinCtrl.listProduits.length).toEqual(2);
		expect(magasinCtrl.listProduits[0]).toEqual({id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"});
		expect(magasinCtrl.listProduits[1]).toEqual({id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"});
	}));

	it("panierCtrl : Récupérer tous les produits du panier", inject(function($controller, $localStorage, panierService){

		$localStorage.panier = mockLocalStorage;

		var panierCtrl = $controller("panierCtrl");
		spyOn(panierService, "getPanier").and.returnValue(mockPromisePanier);
		var totalPrix = 0;
		panierCtrl.getPanier();
		expect(panierCtrl.panier.length).toEqual(Object.keys($localStorage.panier).length);
		panierCtrl.panier.forEach(function (produit, index, array){
			expect(produit.quantite).toEqual(Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(produit.id)).value);
			totalPrix += produit.quantite * produit.prix;
		});
		expect(panierCtrl.totalPrix).toEqual(totalPrix);
	}));

	it("panierCtrl : Modifier la quantité d'un produit du panier", inject(function($controller, $localStorage, panierService){

		$localStorage.panier = mockLocalStorage;

		var panierCtrl = $controller("panierCtrl");
		spyOn(panierService, "getPanier").and.returnValue(mockPromisePanier);
		panierCtrl.getPanier();
		var ancienTotalPrix = panierCtrl.totalPrix;
		var ancienneQuantite1 = panierCtrl.panier[0].quantite;
		var ancienneQuantite2 = panierCtrl.panier[1].quantite;
		panierCtrl.augmenterQuantite(1);
		panierCtrl.diminuerQuantite(2);
		expect(panierCtrl.panier[0].quantite).toEqual(ancienneQuantite1 + 1);
		expect(panierCtrl.panier[1].quantite).toEqual(ancienneQuantite2 - 1);
		expect(panierCtrl.totalPrix).toEqual(ancienTotalPrix + panierCtrl.panier[0].prix - panierCtrl.panier[1].prix);
	}));

	it("panierCtrl : Retirer un produit du panier", inject(function($controller, $localStorage, panierService){

		$localStorage.panier = mockLocalStorage;

		var panierCtrl = $controller("panierCtrl");
		spyOn(panierService, "getPanier").and.returnValue(mockPromiseRemovedPanier);
		panierCtrl.removeFromPanier(2);
		expect(panierCtrl.panier.length).toEqual(mockPanier.length - 1);
		expect(panierCtrl.totalPrix).toEqual(mockRemovedPanier[0].prix * mockRemovedPanier[0].quantite);
	}));

});
