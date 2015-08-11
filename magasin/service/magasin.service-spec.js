describe("Test du magasinService", function() {

	var mockProduits = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"}];

    beforeEach(function() {
		module("ecMobileApp.magasin");
	});

	it("Récupérer tous les produits", inject(function(magasinService, $httpBackend) {

		$httpBackend.expectGET('http://localhost:8080/ecommerce-backend/api/produit').respond(200, mockProduits);

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


	var mockProduit1 = [{id : 1, 
		libelle:"Produit 1",
		prix:150,
		image:"http://lorempixel.com/120/120" }];

	it("Afficher détail d'un produit", inject(function(magasinService, $httpBackend){

		$httpBackend.expectGET('http://localhost:8080/ecommerce-backend/api/produit/'+mockProduit1[0].id).respond(200, mockProduit1);

		magasinService.getDetailsProduit(1).then(function(result){
			expect(result.id).toBe(mockProduit1[0].id);
			expect(result.libelle).toBe(mockProduit1[0].libelle);
			expect(result.prix).toBe(mockProduit1[0].prix);
			expect(result.image).toBe(mockProduit1[0].image);

			expect(result.id===2).toBe(false);
			expect(result.libelle==="Produit 2").toBe(false);
		});
		$httpBackend.flush();
	}));

	// it("Afficher détail d'un produit", inject(function(magasinService, $httpBackend){
	//
	// 	$httpBackend.expectGET('bouchons/produits/all.json').respond(200, mockProduits);
	//
	// 	magasinService.getDetailsProduit(1).then(function(result){
	// 		expect(result.id).toBe(mockProduits[0].id);
	// 		expect(result.libelle).toBe(mockProduits[0].prix);
	// 		expect(result.prix).toBe(mockProduits[0].prix);
	// 		expect(result.image).toBe(mockProduits[0].image);
	// 	});
	// 	$httpBackend.flush();
	// }));


	
	

});
