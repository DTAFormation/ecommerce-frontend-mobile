angular.module('ecMobileApp.magasin')

.factory('payerService', function ($http, $localStorage) {
	var apiRestUrl = "http://localhost:3000/commande";
	var totalPrix = 0;
	return {
		
		save : function(user,commande,prix,panier,type_card){
			var commande_total = {"user_id":user.id,"paiement":commande,"prix_total": prix,"panier":panier,"type_paiement":type_card};
					return $http.post(apiRestUrl,commande_total);
			},

		setTotalPrix : function(total){
				totalPrix = total;
			},

		getTotalPrix : function(){
			return totalPrix;
		},

		payerByCheque : function(user,prix,panier,typeCheque){
			var commande_total = {"user_id":user.id,"prix_total": prix,"panier":panier,"type_paiement":typeCheque};
					return $http.post(apiRestUrl,commande_total);
		}
		};
});
