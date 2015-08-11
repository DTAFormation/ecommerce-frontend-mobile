angular.module('ecMobileApp.magasin')

.factory('magasinService', function ($http, $localStorage) {

	var apiRestUrl = "bouchons/produits";
	var api = "http://localhost:3000/magasin";
	var detailsProduit=[];

	return {

		getProduits : function (){
			return $http.get(apiRestUrl + "/all.json")
			.then(function (result){
				return result.data;
			});
		},

		/*TODO : Tester avec un bouchon le renvoie du get et la transmission de result*/
		getDetailsProduit : function(id){
			return $http.get(api+"/"+id)
			.then(function (result){
				return result.data;
			});
		}

	};

});
