angular.module('ecMobileApp.magasin')

.factory('payerService', function ($http) {
	var apiRestUrl = "http://localhost:3000/commande";
	var api = "http://5.196.89.85:9080/ec-backend/api/client/";
	var totalPrix = 0;
	return {
		
		save : function(user,commande,prix,panier,type_card){
			var commande_total = {"user_id":user.id,"paiement":commande,"prix_total": prix,"panier":panier,"type_paiement":type_card};
					return $http.post(api+user.id+"/commande",commande_total);
			},

		setTotalPrix : function(total){
				totalPrix = total;
			},

		getTotalPrix : function(){
			return totalPrix;
		},

		payerByCheque : function(user,prix,panier,typeCheque){
			var commande_total = {"user_id":user.id,"prix_total": prix,"panier":panier,"type_paiement":typeCheque};
			return $http.post(api+user.id+"/commande",commande_total);
		}
	};
});
