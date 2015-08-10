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
    $routeProvider.when('/secure', {
        auth: function(user){
            return user;
        }
    })
    .otherwise({redirectTo:'/magasin'});

});

angular.module('ecMobileApp').run(function($rootScope, $location) {
    // register listener to watch route changes
    /*$rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if($next.templateUrl===""){
            if ( $rootScope.loggedUser == null ) {
                // no logged user, we should be going to #login
                if ( next.templateUrl === "connexion/template/connexion.tpl.html" ) {
                // already going to #login, no redirect needed
                } else {
                // not going to #login, we should redirect now
                    $location.path( "/connexion" );
                }
            }
        }
    });*/
    $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
        if (next.$$route) {
            var user = $rootScope.user;
            var auth = next.$$route.auth;
            if (auth && !auth(user)) { $location.path('/'); }
        }
    });

});



// Contrôleur qui pilote globalement l'application
angular.module('ecMobileApp').controller("ecMobileCtrl", function(userService) {
    this.title = "ECommerce Mobile";

    this.isConnected=function(){
        return userService.isConnected();
    };

    this.getInfosUser=function(){
        return userService.getInfosUser();
    };

    this.logout=function(){
        userService.logout();
    };

});
