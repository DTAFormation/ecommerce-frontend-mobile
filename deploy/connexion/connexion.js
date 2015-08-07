// Déclaration du module 'connexion'
angular.module('ecMobileApp.connexion', [
	'ngRoute',
]);

// Configuration du module 'connexion'
angular.module('ecMobileApp.connexion').config(function ($routeProvider) {


	$routeProvider
	.when('/connexion', {
		templateUrl:'connexion/template/connexion.tpl.html',
		controller : "connexionController",
		controllerAs:"connexCtrl",
		});
});
