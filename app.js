angular.module('ecMobileApp', [
    'ui.bootstrap',
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ecMobileApp.shared',
    'ecMobileApp.home',
    'ecMobileApp.compteClient',
    'ecMobileApp.magasin',
    'ecMobileApp.connexion'
    ]);

angular.module('ecMobileApp').config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode([true,false]);
    $routeProvider.otherwise({redirectTo:'/magasin'});

});

angular.module('ecMobileApp').run(function($rootScope) {

});

// Contrôleur qui pilote globalement l'application
angular.module('ecMobileApp').controller("ecMobileCtrl", function(userService,panierService,$localStorage) {
    this.title = "ECommerce Mobile";
    this.quantiteTotale = 0;

    this.isConnected=function(){
        return userService.isConnected();
    };

    this.getInfosUser=function(){
        return userService.getInfosUser();
    };

    this.logout=function(){
        userService.logout();
    };

    this.CalculQte = function(){
        this.quantiteTotale = panierService.CalculQte();
    };
    this.CalculQte();
});
