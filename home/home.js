// Déclaration du module 'home'
angular.module('ecMobileApp.home', [
    'ngRoute',
    'ecMobileApp.shared'
]);

// Configuration du module 'home'
angular.module('ecMobileApp.home').config(function($routeProvider) {



=======
    // TODO Définir les routes spécifiques au module 'home' ici
    $routeProvider
    .when("/",{
            templateUrl :'/home/template/home.tpl.html',
            controller : "HomeController",
            controllerAs : "homeCtrl"
        })
        .when("/connexion",{
            templateUrl :"/home/template/connexion.tpl.html",
            controller : "ConnexionController",
            controllerAs : "connexCtrl"})
        .when("/CreationCompte",{
            templateUrl :"/home/template/CreationCompte.html",
            controller : "CreationController",
            controllerAs : "creationCtrl"})
        .when("/panier",{
            templateUrl :"/home/template/panier.html",
            controller : "PanierController",
            controllerAs : "panierCtrl"})
        .otherwise({redirectTo:'/home'});

});

// Contrôleur principal du module 'home'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecMobileApp.home').controller('homeCtrl', function(userService) {

    var self = this;

    // ...

});
