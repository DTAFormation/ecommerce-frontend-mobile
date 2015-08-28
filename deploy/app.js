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

    $routeProvider.otherwise({redirectTo:'/'});
});

angular.module('ecMobileApp').run(function($rootScope, $location, userService,/*$scope*/ panierService) {
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
        var regExp2=new RegExp("/connexion");
        if(regExp2.test(url) && userService.isConnected()){
            $location.path("/");
        }
    });
   /* $rootScope.$on("MyEvent",function(event){
        $scope.quantiteTotale = panierService.CalculQte();
    });*/
});



// Contrôleur qui pilote globalement l'application
angular.module('ecMobileApp').controller("ecMobileCtrl", function(userService,panierService, $scope, $localStorage) {
    var ecMobileCtrl = this;
    var quantiteTotale =0;

    ecMobileCtrl.title = "ECommerce Mobile";
    ecMobileCtrl.quantiteTotale = 0;

    ecMobileCtrl.isConnected=function(){
        return userService.isConnected();
    };

    ecMobileCtrl.logout=function(){
        userService.logout();
    };

    ecMobileCtrl.quantiteTotale  = panierService.CalculQte();

    $scope.$on('eventName', function (event, args) {
        ecMobileCtrl.quantiteTotale = args.message;
    });


});