describe("Test du magasinService", function() {

	var mockProduits = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"}];

    beforeEach(function() {
		module("ecMobileApp.magasin");
	});

	it("Récupérer tous les produits", inject(function(magasinService, $httpBackend) {

		$httpBackend.expectGET('bouchons/produits/all.json').respond(200, mockProduits);

		magasinService.getProduits().then(function (result){
			expect(result.length).toBe(mockProduits.length);
			expect(result[0].id).toBe(mockProduits[0].id);
			expect(result[0].libelle).toBe(mockProduits[0].libelle);
			expect(result[0].prix).toBe(mockProduits[0].prix);
			expect(result[0].image).toBe(mockProduits[0].image);
			expect(result[1].id).toBe(mockProduits[1].id);
			expect(result[1].libelle).toBe(mockProduits[1].libelle);
			expect(result[1].prix).toBe(mockProduits[1].prix);
			expect(result[1].image).toBe(mockProduits[1].image);
		});

		$httpBackend.flush();
	}));

});
