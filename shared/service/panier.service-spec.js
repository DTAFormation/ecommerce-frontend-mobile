describe("Test du panierService", function() {

    beforeEach(function() {
		module("ecMobileApp.shared");
	});

    it("Ajoute un produit au panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [];
        panierService.addToPanier(1,1);
        expect($localStorage.panier[0].idProduit).toEqual(1);
        expect($localStorage.panier[0].quantite).toEqual(1);
    }));

    it("Ajoute un produit déjà existant au panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [];
        panierService.addToPanier(1,1);
        panierService.addToPanier(1,1);
        expect($localStorage.panier[0].idProduit).toEqual(1);
        expect($localStorage.panier[0].quantite).toEqual(2);
    }));

    it("Ajoute deux produits au panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [];
        panierService.addToPanier(1,1);
        panierService.addToPanier(2,1);
        expect($localStorage.panier[0].idProduit).toEqual(1);
        expect($localStorage.panier[0].quantite).toEqual(1);
        expect($localStorage.panier[1].idProduit).toEqual(2);
        expect($localStorage.panier[1].quantite).toEqual(1);
    }));

});
