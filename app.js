angular.module('ecMobileApp', [
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ecMobileApp.shared',
    'ecMobileApp.home',
    'ecMobileApp.magasin'
]);

angular.module('ecMobileApp').config(function($routeProvider) {

    // Ici, les routes générales de l'application
    // Pas de route spécifique ici !
    // Elles doivent être déclarées dans des sous-modules (comme 'home')
    $routeProvider.otherwise({redirectTo:'/home'});
});

angular.module('ecMobileApp').run(function($rootScope) {

});

// Contrôleur qui pilote globalement l'application
angular.module('ecMobileApp').controller("ecMobileCtrl", function() {
    this.title = "ECommerce Mobile";
});
