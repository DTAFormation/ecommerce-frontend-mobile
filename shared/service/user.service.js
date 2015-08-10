angular.module('ecMobileApp.shared').service('userService', function($http, $q) {
    var that=this;
    that.infosUser={};

    var connected = false;
    var urlLogin="http://localhost:8080/ecommerce-backend/api/personne/connect";
    var msg="";
    var url = "http://localhost:3000/connexion";

    this.isConnected = function() {
        return connected;
    };

    this.login = function(plogin, ppassword) {
        var userData={
            "login":plogin,
            "password":ppassword
        };
        

        return $http.post(url,userData)
            .then(function(result){
                //Vérification de la connexion doit se faire côté serveur
                console.log("Connexion service réussi");
                connected=true;
                that.infosUser=result.data;

                })
            .catch(function(){
                console.log("Echec post connexion");
            });
    };

    this.logout = function() {
        connected=false;
    };

    this.getInfosUser=function(){
        return that.infosUser;
    };
});
