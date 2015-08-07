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
            //TODO(priorite 10) Mettre foreach ou filtre
            for (var i = 0; i < $localStorage.panier.length; i++) {     // On ajoute la quantité au produit s'il est déjà dans le panier
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

            // panier en base -> [{"idProduit" : 1, "quantite" : 3}, {"idProduit" : 2, "quantite": 5}]

            // résultat de la requete de base
            // liste des produits -> [{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120" },{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120" }]

            // resultat attendu
            // liste des produits quantifiée -> [{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120", quantite:3},{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120", quantite:5}]


            // voir pour remplacer la concaténation par un array.reduce
            $localStorage.panier.forEach(function (produit, index, array){
                idProduits = idProduits + produit.idProduit;
                if(index+1 < array.length){
                    idProduits = idProduits + "&";
                }
                panierFormate.set(JSON.stringify(produit.idProduit), produit.quantite);
            });

            // panier formaté -> [{"1", 3}, {"2", 5}]

            return $http.get("bouchons/produits/produitByIds" + idProduits + ".json")
            .then(function (result){
                result.data.forEach(function (produit, index, array){
                    produit.quantite = panierFormate.get(JSON.stringify(produit.id));
                });
                return result.data;
            });
        }
    };

});
