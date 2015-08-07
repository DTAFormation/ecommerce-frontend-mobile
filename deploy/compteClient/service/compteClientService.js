angular.module('ecMobileApp.compteClient')
  .service('compteClientService', function($http){

    var cpteCliService = this;

    var apiRestUrl= "http://localhost:3000/test";

    cpteCliService.getlogin = function(login){
      return $http.get(apiRestUrl+"/"+login);
    };

    cpteCliService.postClient = function(compteCLient){
      return $http.post(apiRestUrl,compteCLient);
    };


  });
