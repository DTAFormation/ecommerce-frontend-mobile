angular.module('ecMobileApp.compteClient')
  .service('compteClientService', function($http,$localStorage){

    var cpteCliService = this;

    var apiRestUrl= "http://5.196.89.85:9080/ec-backend/api";

    cpteCliService.getlogin = function(login){
      return $http.get(apiRestUrl+"/user/chercher/"+login);
    };

    cpteCliService.postClient = function(compteCLient){
      var apiPost = apiRestUrl+"/user";
      return $http.post(apiPost,compteCLient);
    };

    //Recherche du client par ID
    this.getById = function(id){
      return $http.get(apiRestUrl+"/user" + "/" + $localStorage.infosUser.id)
      .then(function(result){
        return result.data
      });
    };

    //Mettre à jour les données d'un client
    this.updateClient = function(client){
      return $http.put(apiRestUrl, client);
    };


  });
