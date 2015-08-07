describe("Test du panierService", function() {

    beforeEach(function() {
		module("ecMobileApp.shared");
	});

    it("Ajoute un produit au panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [];
        $localStorage.panier2 = {};

        panierService.addToPanier(1,1);

        // anciens tests
        expect($localStorage.panier[0].idProduit).toEqual(1);
        expect($localStorage.panier[0].quantite).toEqual(1);

        // nouveaux tests
        expect($localStorage.panier2).toEqual({"1":1});
        expect(Object.keys($localStorage.panier2).length).toEqual(1);
        expect(Object.keys($localStorage.panier2)).toEqual(["1"]);
        expect(Object.getOwnPropertyDescriptor($localStorage.panier2, "1").value).toEqual(1);

    }));

    it("Ajoute un produit déjà existant au panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [];
        $localStorage.panier2 = {};

        panierService.addToPanier(1,1);
        panierService.addToPanier(1,1);
        
        // anciens tests
        expect($localStorage.panier[0].idProduit).toEqual(1);
        expect($localStorage.panier[0].quantite).toEqual(2);

        // nouveaux tests
        expect($localStorage.panier2).toEqual({"1":2});
        expect(Object.keys($localStorage.panier2).length).toEqual(1);
        expect(Object.keys($localStorage.panier2)).toEqual(["1"]);
        expect(Object.getOwnPropertyDescriptor($localStorage.panier2, "1").value).toEqual(2);
    }));

    it("Ajoute deux produits au panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [];
        $localStorage.panier2 = {};

        panierService.addToPanier(1,1);
        panierService.addToPanier(2,1);

        // anciens tests
        expect($localStorage.panier[0].idProduit).toEqual(1);
        expect($localStorage.panier[0].quantite).toEqual(1);
        expect($localStorage.panier[1].idProduit).toEqual(2);
        expect($localStorage.panier[1].quantite).toEqual(1);

        // nouveaus tests
        expect($localStorage.panier2).toEqual({"1":1, "2":1});
        expect(Object.getOwnPropertyDescriptor($localStorage.panier2, "1").value).toEqual(1);
        expect(Object.getOwnPropertyDescriptor($localStorage.panier2, "2").value).toEqual(1);
        expect(Object.keys($localStorage.panier2).length).toEqual(2);
        expect(Object.keys($localStorage.panier2)).toEqual(["1", "2"]);
        expect(Object.keys($localStorage.panier2)[0]).toEqual("1");
        expect(Object.keys($localStorage.panier2)[1]).toEqual("2");
    }));

    it("Supprime un produit du panier", inject(function(panierService, $localStorage) {
        $localStorage.panier = [{"idProduit":1, "quantite":1}];
        $localStorage.panier2 = {"1" : 1};

        panierService.removeFromPanier(1);

        // ancien test
        expect($localStorage.panier).toEqual([]);

        // nouveau test
        expect($localStorage.panier2).toEqual({});
    }));

    it("Récupère tous les produits du panier", inject(function(panierService, $httpBackend, $localStorage){
        var mockProduits = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"}];

        $localStorage.panier2 = {"1" : 3, "2" : 4};

        $httpBackend.expectGET('bouchons/produits/produitByIds1&2.json').respond(200, mockProduits);

        panierService.getPanier().then(function (result){
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
