angular.module('ecMobileApp.compteClient')
  .service('compteClientService', function($http){

    var cpteCliService = this;

    var apiRestUrl= "http://5.196.89.85:9080/ec-backend/api";

    cpteCliService.getlogin = function(login){
      return $http.get(apiRestUrl+"/user/chercher/"+login);
    };

    cpteCliService.postClient = function(compteCLient){
      var apiPost = apiRestUrl+"/user";
      return $http.post(apiPost,compteCLient);
    };

    cpteCliService.getCommandes = function(idClient){
      console.log("cpteCliService.getCommandes");
      console.log(idClient);
      //return("cpteCliService.getCommandes");
      return $http.get(apiRestUrl+"/user/"+idClient+"/commandes");
    };
    
  });
