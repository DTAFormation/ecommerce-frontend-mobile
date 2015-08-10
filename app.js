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

angular.module('ecMobileApp').config(function($routeProvider) {

    $routeProvider.otherwise({redirectTo:'/magasin'});
});

angular.module('ecMobileApp').run(function($rootScope, $location, userService) {
    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
    
        var url=next.$$route.originalPath;
        var regExp=new RegExp("/secure/*");
        if(regExp.test(url)){
            if ( !userService.isConnected() ) {
                // no logged user, we should be going to #login
                if ( next.templateUrl === "connexion/template/connexion.tpl.html" ) {
                // already going to #login, no redirect needed
                } else {
                // not going to #login, we should redirect now
                    $location.path( "/connexion" );
                }
            }
        }
    });
});



// Contrôleur qui pilote globalement l'application
angular.module('ecMobileApp').controller("ecMobileCtrl", function(userService,panierService,$localStorage) {
    var ecMobileCtrl = this;

    ecMobileCtrl.title = "ECommerce Mobile";
    ecMobileCtrl.quantiteTotale = 0;

    ecMobileCtrl.isConnected=function(){
        return userService.isConnected();
    };

    ecMobileCtrl.logout=function(){
        userService.logout();
    };


    ecMobileCtrl.CalculQte = function(){
        if($localStorage.panier){
            Object.keys($localStorage.panier).forEach(function(key){
                ecMobileCtrl.quantiteTotale = ecMobileCtrl.quantiteTotale + Object.getOwnPropertyDescriptor($localStorage.panier, key).value;
            });     
        }
    };

    ecMobileCtrl.CalculQte();
});
