angular.module('ecMobileApp.magasin')

.factory('payerService', function ($http, userService, panierService) {
	var api = "http://5.196.89.85:9080/ec-backend/api/user/";
//    var api = "http://localhost:8080/ecommerce-backend/api/user/";
	var totalPrix = 0;
	var fraisLivraison = 0;
	return {

		setTotalPrix : function(total){
				totalPrix = total + fraisLivraison;
			},

		getTotalPrix : function(){
			return totalPrix;
		},

		payer : function(adresseLivraison, adresseFacturation, typePaiement) {

            var user = userService.getInfosUser();
            var maybePanier = panierService.getPanier();

            var commande = {
                client: {
                    id: user.id,
                },
                facture: {
                    date: new Date(),
                    modePaiement: typePaiement,
//                    total: this.getTotalPrix(),
                    adresseLivraison: adresseLivraison,
                    adresseFacturation: adresseFacturation
                }
            };

            return maybePanier.then(function(panier) {

                // Produit[] en entrée, CommandeProduit[] en sortie
                var commandeProduits = panier.map(function (produit) {
                    return {
                        quantite: produit.quantite,
                        produit: {
                            id: produit.id
                        }
                    };
                });

                commande.commandeProduits = commandeProduits;

                return $http.post(api + user.id + "/commande", commande)
                    .then(function(success) {
                        panierService.vider();
                    });
            });
		}
	};
});
