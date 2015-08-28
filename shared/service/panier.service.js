angular.module('ecMobileApp.shared').factory('panierService', function ($http, $localStorage,$rootScope) {

    var apiRestUrl = "http://5.196.89.85:9080/ec-backend/api";

    return {
        addToPanier: function(idProduit, quantite) { //modifie la quantite de l'article dans le panier du $localStorage
            var newQuantite = quantite;

            if (!$localStorage.panier) {
                $localStorage.panier = {};
            }
            /*Object.getOwnPropertyDescriptor(obj, prop)
            obj =L'objet sur lequel on cherche la propriété.
            prop=Le nom de la propriété dont on souhaite avoir la description.*/
            if(Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(idProduit))){
                //si l'objet est deja present dans le panier on calcule sa nouvelle quantite
                newQuantite = newQuantite + Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(idProduit)).value;
            }

            /*Object.defineProperty(obj, prop, descripteur)
            obj=L'objet sur lequel on souhaite définir ou modifier une propriété.
            prop=Le nom de la propriété qu'on définit ou qu'on modifie.
            descripteur=Le descripteur de la propriété qu'on définit ou qu'on modifie.
            */
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

            if(Object.keys($localStorage.panier).length === 0){
                return {
                    then : function(fn) {
                        fn([]);
                    }
                };
            } else{
                // Objectif -> passer du panier { "1" : 2, "2" : 3 } à "1,2,3" pour envoyer une liste d'id en paramètre de requete

                var ids = [];
                Object.keys($localStorage.panier).forEach(function (key){
                    ids.push(key);
                });

                // quand on met le tableau [1,2,3,5] dans une chaine de caractère il s'écrit -> 1,2,3,5
                return $http.get(apiRestUrl + "/produit/byIds/" + ids)
                .then(function (result){
                    result.data.forEach(function (produit){
                        produit.quantite = Object.getOwnPropertyDescriptor($localStorage.panier, JSON.stringify(produit.id)).value;
                    });
                    return result.data;
                });

            }
        },

        CalculQte : function(){ //calcul la quantite totale des produits dans le panier
            var quantiteTotale = 0;
            if($localStorage.panier){
                Object.keys($localStorage.panier).forEach(function(key){
                    quantiteTotale = quantiteTotale + Object.getOwnPropertyDescriptor($localStorage.panier, key).value;
                });
            }
            return quantiteTotale;
/*
            $rootScope.$emit("MyEvent",function(event){
                if($localStorage.panier){
                    Object.keys($localStorage.panier).forEach(function(key){
                        quantiteTotale = quantiteTotale + Object.getOwnPropertyDescriptor($localStorage.panier, key).value;
                    });
                }
                return quantiteTotale;
            });*/


        },

        vider: function() {
            delete $localStorage.panier;
        }
    };

});
