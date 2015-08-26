angular.module('ecMobileApp.magasin')

.factory('payerService', function ($http) {
	//var apiRestUrl = "http://localhost:3000/commande";
	//var api = "http://5.196.89.85:9080/ec-backend/api/client/";

	var apiRest = "http://5.196.89.85:9080/ec-backend/api/user/";

	var totalPrix = 0;
	return {
		//user:les infos du user (id, nom, login, adresses,...)
		//commande:informations de carte bleue
		//prix:prix du panier
		//panier:le contenu du panier (objet et ses caracteristiques et la quantité)
		//type_card:fausse valeur (plus proche d'une enumeration, ici "CB")
		//id_adresse:l'id de l'adresse dans la liste des adresses du user
		save : function(user,commande,prix,panier,type_card,id_adresse){
			//console.log("payerByCB");
			//console.log(user);
			//console.log(commande);
			//console.log(prix);
			//console.log(panier);
			//console.log(type_card);
			//console.log(id_adresse);
			var commande_total = {"user_id":user.id,"paiement":commande,"prix_total": prix,"panier":panier,"type_paiement":type_card/*,"adresse_livraison":id_adresse*/};
			return $http.post(apiRest+user.id+"/commande",commande_total);
			},

		setTotalPrix : function(total){
				totalPrix = total;
			},

		getTotalPrix : function(){
			return totalPrix;
		},

		payerByCheque : function(user,prix,panier,typeCheque,id_adresse){
			//console.log("payerByCheque");
			//console.log(user);
			//console.log(prix);
			//console.log(panier);
			//console.log(typeCheque);
			//console.log(id_adresse);
			var commande_total = {"user_id":user.id,"prix_total": prix,"panier":panier,"type_paiement":typeCheque,"adresse_livraison":id_adresse};
			return $http.post(apiRest+user.id+"/commande",commande_total);
		}
	};
});
