angular.module('ecMobileApp.magasin')

.factory('magasinService', function ($http, $localStorage) {

	var apiRestUrl = "";

	return {

		getProduits : function (){
			console.log("magasin service getProduits");
			return $http.get("" + "/produits")
			.then(function (result){
				return result;
			});
		}

	};
	
});
