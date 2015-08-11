// Déclaration du module 'home'
angular.module('ecMobileApp.home', [
    'ngRoute',
    'ecMobileApp.shared'
]);

// Configuration du module 'home'
angular.module('ecMobileApp.home').config(function($routeProvider) {


    // TODO Définir les routes spécifiques au module 'home' ici
    $routeProvider
    .when("/",{
            templateUrl :'home/template/home.tpl.html',
            controller : "homeCtrl",
            controllerAs : "homeCtrl"
    })
    .when("/CreationCompte",{
        templateUrl :"home/template/CreationCompte.html",
        controller : "CreationController",
        controllerAs : "creationCtrl"
    })
    .otherwise({redirectTo:'/'});

});

// Contrôleur principal du module 'home'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecMobileApp.home').controller('homeCtrl', function($scope) {

   /* var self = this;
   self.myInterval = 5000;
  self.noWrapSlides = false;
  var slides = self.slides = [];
  self.addSlide = function() {
    slides.push({
      image: 'http://lorempixel.com/400/200/'
    });
  };
  for (var i=0; i<4; i++) {
    self.addSlide();
  }*/
});
