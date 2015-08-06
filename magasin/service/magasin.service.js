angular.module('ecMobileApp.magasin')

.factory('magasinService', function ($http, $localStorage) {

	var apiRestUrl = "bouchons/produits";

	return {

		getProduits : function (){
			return $http.get(apiRestUrl + "/all.json")
			.then(function (result){
				console.log(result.data)
				return result.data;
			});
		},

		/*TODO : Tester avec un bouchon le renvoie du get et la transmission de result*/	
		getDetailsProduit : function(id){
			console.log("magasin service getDetailsProduit");
			return $http.get(""+"/detailsProduit/"+id)
			.then(function (result){
				return result;
			});
		}

	};
	
});
