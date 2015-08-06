angular.module('ecMobileApp.shared').factory('panierService', function($localStorage) {

    return {
        addToPanier: function(idProduit, quantite) {
            var itemPanier = {
                idProduit: idProduit,
                quantite: quantite
            };
            if (!$localStorage.panier) {
                $localStorage.panier = [];
            }
            for (var i = 0; i < $localStorage.panier.length; i++) {
                if ($localStorage.panier[i].idProduit === idProduit) {
                    $localStorage.panier[i].quantite += quantite;
                    return;
                }
            }
            $localStorage.panier.push(itemPanier);
            return;
        }
    };

});
