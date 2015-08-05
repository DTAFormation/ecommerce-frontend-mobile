
// défintion du module compte compteClient

angular.module('ecMobileApp.compteClient', [
      'ngRoute',
      'ecMobileApp.shared',
      'ui.validate'
]);

// routag du module compteClient
angular.module('ecMobileApp.compteClient').config(function($routeProvider) {

  $routeProvider

    // consultation du compte d'un client
    .when ("/compteClient", {
      templateUrl: "/template/compteClient.html",
      controller: "compteClientCtrl",
      controllerAs: "cpteCliCtrl"
    })

    // routage vers la page de création de compte
    .when ("/compteClient/new", {
      templateUrl: "compteClient/template/newCompteClient.html",
      controller: "newCompteClientCtrl",
      controllerAs: "newcpteCliCtrl"
    })

    // redirige vers l'index en cas de problème d'url
    .otherwise({
      redirectTo :"/"
    });

});

// controller du module compteClient
angular.module('ecMobileApp.compteClient').controller('compteClientCtrl', function(userService) {

    var cpteCliCtrl = this;

});

// controller pour la création d'un nouveau compte Client
angular.module('ecMobileApp.compteClient').controller('newCompteClientCtrl', function(userService) {
    var newcpteCliCtrl = this;

    // Initialisation du nouveau compte client
    var cpteCli;

    // fonctions de validation avec angular UI

      // vérification du mot de passe de manière synchrone
      newcpteCliCtrl.equality = function (value , reference) {
        return angular.equals(value,reference);

      };

      // vérification de la non existance de la donnée sur le serveur.

    // récupération et traitement du formulaire
    newcpteCliCtrl.newCpte = function (form){

    };

});
