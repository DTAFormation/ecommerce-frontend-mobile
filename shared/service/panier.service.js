angular.module('ecMobileApp.shared').factory('panierService', function ($http, $localStorage) {

    var apiRestUrl = "http://localhost:8082/ecommerce-backend/api";
    var quantiteTotale = 0;

    return {
        addToPanier: function(idProduit, quantite) {
            var newQuantite = quantite;

            if (!$localStorage.panier) {
                $localStorage.panier = {};
            }

            if(Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(idProduit))){
                newQuantite = newQuantite + Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(idProduit)).value;
            }

            Object.defineProperty($localStorage.panier, JSON.stringify(idProduit), {value : newQuantite, writable : true, enumerable : true, configurable : true});

            return;
        },

        removeFromPanier: function(idProduit) {
            delete $localStorage.panier[JSON.stringify(idProduit)];
        },

        getPanier: function (){
            var panierService = this;
            var idProduits = "";

            // résultat de la requete de base 
            // liste des produits -> [{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120" },{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120" }]

            // resultat attendu 
            // liste des produits quantifiée -> [{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120", quantite:3},{id:1, libelle:"Produit 1", prix:150, image:"http://lorempixel.com/120/120", quantite:5}]

            // si le panier n'existe pas, on en crée un vide (évite de faire un foreach sur un panier vide)
            if(!$localStorage.panier){
                $localStorage.panier = {};
            }

            // Objectif -> passer du panier { "1" : 2, "2" : 3 } à "1&2&3" pour envoyer une liste d'id en paramètre de requete
            // voir pour remplacer la concaténation par un array.reduce
            Object.keys($localStorage.panier).forEach(function (key, index, array){
                idProduits = idProduits + key;
                if(index+1 < array.length){
                    idProduits = idProduits + "&";
                }
            });

            return $http.get("bouchons/produits/produitByIds" + idProduits + ".json")
            .then(function (result){
                result.data.forEach(function (produit, index, array){
                    produit.quantite = Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(produit.id)).value;
                });
                return result.data;
            });
        },

        CalculQte : function(){
            if($localStorage.panier){
            Object.keys($localStorage.panier).forEach(function(key){
                quantiteTotale = quantiteTotale + Object.getOwnPropertyDescriptor($localStorage.panier, key).value;
            });     
        }
        console.log("return quantiteTotale"+quantiteTotale);
        return quantiteTotale;

        }
    };

});
