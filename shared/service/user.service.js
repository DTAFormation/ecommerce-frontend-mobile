angular.module('ecMobileApp.shared').service('userService', function($http, $localStorage) {
    var that=this;

    var connected = false;
    var urlLogin="http://5.196.89.85:9080/ec-backend/api/user/connect";

    this.isConnected = function() {
        if($localStorage.infosUser){
            connected=true;
        }
        return connected;
    };

    this.login = function(plogin, ppassword) {
        var userData={
            "login":plogin,
            "password":ppassword
        };
        
        return $http.post(urlLogin,userData)
            .then(function(result){
                connected=true;
                if(!$localStorage.infosUser){
                    $localStorage.infosUser={};
                }
                $localStorage.infosUser=result.data;
            })
            .catch(function(){

            });
    };

    this.logout = function() {
        connected=false;
        delete $localStorage.infosUser;
    };

});
