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
        

        return $http.post(urlLogin,userData)
            .then(function(result){
                //Vérification de la connexion doit se faire côté serveur
                //console.log("Connexion service réussi");
                //console.log("result "+result.data);
                
                connected=true;
                that.infosUser=result.data;

                console.log("result");
                console.log(result.data);
                console.log(result.data.nom);
                /*console.log("InfosUSer");
                console.log(that.infosUser);
                console.log("InfosUSer.nom");
                console.log(that.infosUser.nom);
                
                console.log("string"+objet.toString())*/
                //console.log("nom"+JSON.stringify(that.infosUser.nom));
                //$rootScope.loggedUser=result.data;
                sessionStorage.infosUser=result.data;
                //console.log("Session : "+sessionStorage.infosUser);
            })
            .catch(function(){
                //console.log("Echec post connexion");
            });
    };

    this.logout = function() {
        connected=false;
        //$rootScope.loggedUser=null;
        that.infosUser=null;
        sessionStorage.infosUser=null;
        //console.log("loggedUser "+$rootScope.loggedUser);
    };

    this.getInfosUser=function(){
        return that.infosUser;
    };
});
