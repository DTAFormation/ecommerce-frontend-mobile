// Déclaration du module 'testUtils'
angular.module('testUtils', []).service("mockUtils", function(){

	var mockProduits = [{id : 1, libelle : "Produit 1", prix : 150, image : "http://lorempixel.com/120/120"}, {id : 2, libelle : "Produit 2", prix : 150, image : "http://lorempixel.com/120/120"}];

	this.mockPromiseProduits = {
					then : function(fn) {
						fn(mockProduits);
					}
				};

	this.mockPromise = function(mockProduits) {
		return {
			then : function(fn) {
				fn(mockProduits);
			}
		};
	};
					
});