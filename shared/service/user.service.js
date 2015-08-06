angular.module('ecMobileApp.shared').service('userService', function($http, $q) {
    var that=this;
    that.infosUser=[];

    var connected = false;
    var urlLogin="http://localhost:3000/0";
    var msg="";


    this.isConnected = function() {
        return connected;
    };

    this.login = function(login, password) {
        var userData={
            userLogin:login,
            userPwd:password
        };
        return $http.get(urlLogin,userData)
            .then(function(result){
                //Vérification de la connexion doit se faire côté serveur
                console.log("Connexion service réussi");
                connected=true;
                that.infosUser=result.data;
                })
            .catch(function(result){
                console.log("Echec get connexion");
            });
    };

    this.logout = function() {
        connected=false;
    };

    this.getInfosUser=function(){
        return that.infosUser;
    };
});
