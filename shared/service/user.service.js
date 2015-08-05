angular.module('ecMobileApp.shared').service('userService', function($http, $q) {

    var connected = false;

    this.isConnected = function() {
        return connected;
    };

    this.login = function(login, password) {
        // TODO : Gestion de la connexion
    };

    this.logout = function() {
        // TODO Gestion de la déconnexion
    };

});
