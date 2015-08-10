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
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        //console.log("routeChange");
        var url=next.$$route.originalPath;
        //console.log("url "+url);
        var regExp=new RegExp("/secure/*");
        if(regExp.test(url)){
            //console.log("reg exp match");
            //if ( $rootScope.loggedUser == null ) {
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
    /*$rootScope.$on('$routeChangeStart', function (ev, next, curr) {
        if (next.$$route) {
            var user = $rootScope.user;
            var auth = next.$$route.auth;
            if (auth && !auth(user)) { $location.path('/'); }
        }
    });*/
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
        for(var i = 0; i < $localStorage.panier.length; i++){
            this.quantiteTotale = this.quantiteTotale + $localStorage.panier[i].quantite;
        }
    };
    //this.CalculQte();
});
