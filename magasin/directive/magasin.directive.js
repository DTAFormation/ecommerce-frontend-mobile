angular.module('ecMobileApp.magasin')

    .directive('ecLigneProduit', function(panierService,$location) {
        return {
            restrict:'E',
            templateUrl : 'magasin/directive/ecLigneProduit.tpl.html',
            scope: true,
           
            link: function(scope, iElement, iAttrs, ctrl) {
                var produit = scope.$eval(iAttrs.ngProduit);
                scope.produit = produit;
            },
            controller: function($scope){
                // /!\ Attention, pas de syntaxe controllerAs ici
                // donc bien utiliser $scope pour enregistrer les
                // variables et les fonctions

            }
        };
    });