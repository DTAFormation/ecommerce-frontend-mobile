describe('E2E : Test Protractor panier',function(){

	it ('Test panier (image + bouton)', function(){
		browser.get(browser.baseUrl); //permet d’ouvrir la page passé en paramètre
		element(by.id('magasin')).click(); //on clique sur l'élément qui a l'id magasin, dans notre cas le lien vers magasin
		expect(browser.getLocationAbsUrl()).toEqual('/magasin'); //on verifie que l'url soit celle attendue
		
		/* Chemin pour afficher les clients */
                var tableMagasin = element(by.css("table")); // le tableau des produits du magasin
                expect(tableMagasin.isPresent()).toBeTruthy(); //verifie qu'il y a un tableau

                var ajout=element(by.id('ajoutPanier'));
                /*on ajoute 3 produits au panier*/
                ajout.click();
                ajout.click();
                ajout.click();

                element(by.id('panier')).click(); //clique sur 'Panier'
                expect(browser.getLocationAbsUrl()).toEqual('/panier'); //on verifie que l'url soit celle attendue

                var tablePanier = element(by.css("table")); // le tableau des produits du panier
                var allRows = tablePanier.all(by.css("tr")); //toutes les lignes du tableau
                expect(allRows.count()).toBeGreaterThan(0); //le nombre de ligne ne doit pas etre nul, donc superieur à 0

                var Td = allRows.all(by.css("td")); //colonnes du tableau
                expect(Td.count()).toBe(1);

                var img = Td.all(by.css("img")); //image du produit du panier
                expect(img.count()).toBe(1);

                var button = Td.all(by.css("button")); //image du produit du panier
                expect(button.count()).toBe(3);


	});

});