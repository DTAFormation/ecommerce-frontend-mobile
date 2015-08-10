angular.module('ecMobileApp.shared').factory('panierService', function ($http, $localStorage) {

    var apiRestUrl = "";
    var quantiteTotale = 0;

    return {
        addToPanier: function(idProduit, quantite) {

            // nouvelle gestion du panier by Johnny
            var newQuantite = quantite;

            if (!$localStorage.panier2) {
                $localStorage.panier2 = {};
            }

            if(Object.getOwnPropertyDescriptor($localStorage.panier2, JSON.stringify(idProduit))){
                newQuantite = newQuantite + Object.getOwnPropertyDescriptor($localStorage.panier2, JSON.stringify(idProduit)).value;
            }

            Object.defineProperty($localStorage.panier2, JSON.stringify(idProduit), {value : newQuantite, writable : true, enumerable : true, configurable : true});


            // Ancien truc de simon
            var itemPanier = {
                idProduit: idProduit,
                quantite: quantite
            };
            if (!$localStorage.panier) {
                $localStorage.panier = [];
            }

            //TODO(priorite 10) Mettre foreach ou filtre
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
            // nouvelle version du delete
            delete $localStorage.panier2[JSON.stringify(idProduit)];

            // ancienne version du delete
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

            // panier en base -> [{"idProduit" : 1, "quantite" : 3}, {"idProduit" : 2, "quantite": 5}]

            // résultat de la requete de base 
            // liste des produits -> [{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120" },{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120" }]

            // resultat attendu 
            // liste des produits quantifiée -> [{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120", quantite:3},{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120", quantite:5}]

            // si le panier n'existe pas, on en crée un vide (évite de faire un foreach sur un panier vide)
            if(!$localStorage.panier2){
                $localStorage.panier2 = {};
            }

            // voir pour remplacer la concaténation par un array.reduce
            Object.keys($localStorage.panier2).forEach(function (key, index, array){
                idProduits = idProduits + key;
                if(index+1 < array.length){
                    idProduits = idProduits + "&";
                }
                //panierFormate.set(JSON.stringify(produit.idProduit), produit.quantite);
            });

            // panier formaté -> [{"1", 3}, {"2", 5}]
            // { "1" : 3, "2" : 5}


            return $http.get("bouchons/produits/produitByIds" + idProduits + ".json")
            .then(function (result){
                result.data.forEach(function (produit, index, array){
                    //produit.quantite = panierFormate.get(JSON.stringify(produit.id));
                    produit.quantite = Object.getOwnPropertyDescriptor($localStorage.panier2, JSON.stringify(produit.id)).value;
                });
                return result.data;
            });
        },

        CalculQte : function(){
            if ($localStorage.panier){
                for(var i = 0; i < $localStorage.panier.length; i++){
                    quantiteTotale = quantiteTotale + $localStorage.panier[i].quantite;
                }
                return quantiteTotale;
            }
            
        }
    };

});
