angular.module('ecMobileApp.magasin')

.factory('payerService', function ($http, $localStorage) {
	var apiRestUrl = "http://localhost:3000/test";
	var totalPrix = 0;
	return {
		
		save : function(commande,prix,panier,type_card){
			var commande_total = {"paiement":commande,"prix_total": prix,"panier":panier,"type_paiement":type_card};
					return $http.post(apiRestUrl,commande_total);
			},

		setTotalPrix : function(total){
				totalPrix = total;
			},

		getTotalPrix : function(){
			return totalPrix;
		}
		};
});
