angular.module('ecMobileApp.magasin')

    .directive('ecLigneProduit', function() {
        return {
            restrict:'E',
            templateUrl : 'magasin/directive/ecLigneProduit.tpl.html',
           
            link: function(scope, iElement, iAttrs, ctrl) {
                var produit = scope.$eval(iAttrs.ngProduit);
                scope.produit = produit;
            }
        };
    });