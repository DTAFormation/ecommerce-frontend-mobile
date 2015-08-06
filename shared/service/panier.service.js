angular.module('ecMobileApp.shared').factory('panierService', function ($http, $localStorage) {

    var apiRestUrl = "";

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
        },

        removeFromPanier: function(idProduit) {
            for (var i = 0; i < $localStorage.panier.length; i++) {
                if ($localStorage.panier[i].idProduit === idProduit) {
                    $localStorage.panier.splice(i, 1);
                    return;
                }
            }
        },

        getPanier: function (){
            var panierService = this;
            var idProduits = "";
            var panierFormate = new Map();

            for(var i=0; i < $localStorage.panier.length; i++){
                idProduits = idProduits + $localStorage.panier[i].idProduit;
                if(i+1< $localStorage.panier.length){
                    idProduits = idProduits + "&";
                }
                panierFormate.set(JSON.stringify($localStorage.panier[i].idProduit), $localStorage.panier[i].quantite);
            }

            return $http.get("bouchons/produits/produitByIds" + idProduits + ".json")
            .then(function (result){
                for(var i=0; i<result.data.length; i++){
                    result.data[i].quantite = panierFormate.get(JSON.stringify(result.data[i].id));
                }
                return result.data;
            });
        }
    };

});
