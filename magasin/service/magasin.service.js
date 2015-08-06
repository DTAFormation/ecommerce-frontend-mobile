angular.module('ecMobileApp.magasin')

.factory('magasinService', function ($http, $localStorage) {

	var apiRestUrl = "bouchons/produits";

	return {

		getProduits : function (){
			return $http.get(apiRestUrl + "/all.json")
			.then(function (result){
				return result.data;
			});
		},

		getDetailsProduit : function(id){
			console.log("magasin service getDetailsProduit");
			return $http.get(""+"/detailsProduit/"+id)
			.then(function (result){
				return result;
			});
		}

	};
	
});
