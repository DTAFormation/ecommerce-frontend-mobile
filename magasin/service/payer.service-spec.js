/*describe("Test du payerService", function() {

	var mockPaiement = [{type : CB, numero : "numero1", date_validite.month : 9, date_validite.year : 2015,crypto :123}]
    beforeEach(function() {
		module("ecMobileApp.magasin");
	});

	it("Poster la commande", inject(function(magasinService, $httpBackend) {

		$httpBackend.expectGET("http://localhost:3000/test").respond(200, mockProduits);

		magasinService.getProduits().then(function (result){
			expect(result.length).toBe(mockPaiement.length);
			expect(result[0].type).toBe(mockPaiement[0].type;
			expect(result[0].numero).toBe(mockPaiement[0].numero);
			expect(result[0].date_validite.month).toBe(mockPaiement[0].date_validite.month);
			expect(result[0].date_validite.year).toBe(mockPaiement[0].date_validite.year);
			expect(result[0].date_validite.crypto).toBe(mockPaiement[0].date_validite.crypto);
		});

		$httpBackend.flush();
	}));

});*/
