describe("Test du payerService", function() {

	var mockPaiement = {user_id: "1",panier:{id :1,libelle:"Produit 1",prix :150,quantite:3},paiement: { numero: "numero1",date_validite: {month: 4,year: 2016},crypto: 103},prix_total: 450,type_paiement: "CB"};
	var mockPaiement2 = {user_id:"1",panier:{id :1,libelle:"Produit 1",prix :150,quantite:2},prix_total:300,type_paiement : "Chèque"};
	var totalPrix = 0;

    beforeEach(function() {
		module("ecMobileApp.magasin");
	});

    it("Set le prix total du panier", inject(function(payerService) {
		payerService.setTotalPrix(300);
		expect(payerService.getTotalPrix()).toEqual(300);

    }));


	it("Obtenir le prix total du panier", inject(function(payerService) {
        spyOn(payerService, "getTotalPrix").and.returnValue(payerService.totalPrix);
    }));

});




