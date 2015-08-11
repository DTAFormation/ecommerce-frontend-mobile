angular.module('ecMobileApp.magasin')

.factory('magasinService', function ($http, $localStorage) {


	var apiBouchon = "bouchons/produits";
	var apiRestUrl = "http://5.196.89.85:9080/ec-backend/api";
	var api = "http://localhost:3000/magasin";

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
			/*return $http.get(api+"/"+id)*/
			return $http.get(apiRestUrl + "/produit/" + id)
			.then(function (result){
				return result.data;
			});
		}

	};

});
