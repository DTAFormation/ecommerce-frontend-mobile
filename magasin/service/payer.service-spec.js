describe("Test du payerService", function() {

	var mockPaiement = {user_id: "1",panier:{id :1,libelle:"Produit 1",prix :150,quantite:3},paiement: { numero: "numero1",date_validite: {month: 4,year: 2016},crypto: 103},prix_total: 450,type_paiement: "CB"};
	var mockPaiement2 = {user_id:"1",panier:{id :1,libelle:"Produit 1",prix :150,quantite:2},prix_total:300,type_paiement : "Chèque"};
	var totalPrix = 0;

    beforeEach(function() {
		module("ecMobileApp.magasin");
	});

	
	it("Poster la commande avec paiement CB", inject(function(payerService, $httpBackend,$controller) {
		$httpBackend.expect("POST","http://localhost:3000/commande",mockPaiement).respond(200);

		var user = {id:"1",login:"root",mdp:"",nom:"root",prenom:"root"};
		var commande ={ numero: "numero1",date_validite: {month: 4,year: 2016},crypto: 103};
		var prix = 450;
		var panier ={id :1,libelle:"Produit 1",prix :150,quantite:3};
		var type_card="CB";

		payerService.save(user,commande,prix,panier,type_card).then(function (result){
			expect(result.status).toEqual(200);
		},function (error){
			expect(error).toThrow();
		});


		$httpBackend.flush();

	}));

	it("Poster la commande avec paiement Chèque", inject(function(payerService, $httpBackend,$controller) {
		$httpBackend.expect("POST","http://localhost:3000/commande",mockPaiement2).respond(200);

		var user = {id:"1",login:"root",mdp:"",nom:"root",prenom:"root"};
		var prix = 300;
		var panier ={id :1,libelle:"Produit 1",prix :150,quantite:2};
		var typeCheque="Chèque";

		payerService.payerByCheque(user,prix,panier,typeCheque).then(function (result){
			expect(result.status).toEqual(200);
		},function (error){
			expect(error).toThrow();
		});
		$httpBackend.flush();
}));


    it("Set le prix total du panier", inject(function(payerService,$controller) {
		payerService.setTotalPrix(300);
		expect(payerService.getTotalPrix()).toEqual(300);
		
    }));


	it("Obtenir le prix total du panier", inject(function(payerService,$controller) {
        spyOn(payerService, "getTotalPrix").and.returnValue(payerService.totalPrix);
    }));

});




