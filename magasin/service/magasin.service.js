angular.module('ecMobileApp.magasin')

.factory('magasinService', function ($http, $localStorage) {

	var apiBouchon = "bouchons/produits";
	var apiRestUrl = "http://localhost:8082/ecommerce-backend/api";
	//var api = "http://localhost:3000/0";
	var detailsProduit=[];

	return {

		getProduits : function (){
			//return $http.get(apiRestUrl + "/all.json")
			return $http.get(apiRestUrl + "/produit")
			.then(function (result){
				return result.data;
			});
		},

		/*TODO : Tester avec un bouchon le renvoie du get et la transmission de result*/
		getDetailsProduit : function(id){
			//console.log("magasin service getDetailsProduit");
			/*return $http.get(""+"/detailsProduit/"+id)*/
			return $http.get(apiBouchon + "/produit1.json")
			.then(function (result){
				return result.data[0];
			});
		}

	};

});
