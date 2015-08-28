angular.module('ecMobileApp.compteClient')
  .service('compteClientService', function($http, userService){

    var self = this;

    var apiRestUrl= "http://5.196.89.85:9080/ec-backend/api";

    self.getlogin = function(login){
      return $http.get(apiRestUrl+"/user/chercher/"+login);
    };

    self.postClient = function(compteCLient){
      var apiPost = self.getUserAPI();
      return $http.post(apiPost,compteCLient);
    };


    self.getCommandes = function(idClient){

      //return("cpteCliService.getCommandes");
      return $http.get(apiRestUrl+"/user/"+idClient+"/commandes");
    };
    

    //Recherche du client par ID
    this.getById = function(id){
      return $http.get(self.getUserAPI() + "/" + userService.getInfosUser().id)
      .then(function(result){
        return result.data;
      });
    };

    //Mettre à jour les données d'un client
    this.updateClient = function(client){
      return $http.put(self.getUserAPI(), client);
    };

    this.getUserAPI = function() {
      return apiRestUrl + "/user";
    };
  });
 


