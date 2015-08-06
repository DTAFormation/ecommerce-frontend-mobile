angular.module('ecMobileApp', [
    'ui.bootstrap',
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ecMobileApp.shared',
    'ecMobileApp.home',
    'ecMobileApp.compteClient',
    'ecMobileApp.magasin'
]);

angular.module('ecMobileApp').config(function($routeProvider) {


    $routeProvider.otherwise({redirectTo:'/magasin'});

});

angular.module('ecMobileApp').run(function($rootScope) {

});

// Contrôleur qui pilote globalement l'application
angular.module('ecMobileApp').controller("ecMobileCtrl", function() {
    this.title = "ECommerce Mobile";
});
