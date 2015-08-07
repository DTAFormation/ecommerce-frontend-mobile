
// défintion du module compte compteClient

angular.module('ecMobileApp.compteClient', [
      'ngRoute',
      'ecMobileApp.shared',
      'ui.validate'
]);

// routag du module compteClient
angular.module('ecMobileApp.compteClient').config(function($routeProvider) {

  $routeProvider
  
    // routage vers la page de création de compte
    .when ("/compteClient/new", {
      templateUrl: "compteClient/template/newCompteClient.html",
      controller: "newCompteClientCtrl",
      controllerAs: "newcpteCliCtrl"
    })

    // redirige vers l'index en cas de problème d'url
    .otherwise({
      redirectTo :"/"
    });

});

// controller du module compteClient
angular.module('ecMobileApp.compteClient').controller('compteClientCtrl', function(userService) {

    var cpteCliCtrl = this;

});

// controller pour la création d'un nouveau compte Client
angular.module('ecMobileApp.compteClient').controller('newCompteClientCtrl', function(userService,$http, $location, $q) {
    var newcpteCliCtrl = this;

    newcpteCliCtrl.asyncValidation = true;

    var apiRestUrl= "http://localhost:3000/test";

    var infoPanel="";

    // Initialisation du nouveau compte client
    //  newcpteCliCtrl.cpteCli;

    // fonctions de validation avec angular UI, vérification de la non existance de la donnée sur le serveur.
    newcpteCliCtrl.doesNotExist = function(value) {
      console.log("validationn asynchrone");

      var verif = function(value){

        return $q(function(resolve, reject) {
          $http.get(apiRestUrl+"/"+value)
            .then(function(response){
                console.log("page trouvée");
                reject(false);
            },function(response){
                console.log("page non trouvée");
                resolve(true);
            });
        });
      };

      return verif(value);
    };

    // récupération et traitement du formulaire
    newcpteCliCtrl.newCpte = function (form){

      console.log("form is invalid: "+form.$invalid);
        if (form.$invalid)
        {
          console.log("isInvalid");
          return;
        }
        var compteClient = {
          nom : null,
          prenom : null,
          login : null,
          password : null
        };

        compteClient.nom = newcpteCliCtrl.cpteCli.nom;
        compteClient.prenom = newcpteCliCtrl.cpteCli.prenom;
        compteClient.login = newcpteCliCtrl.cpteCli.login;
        compteClient.password = newcpteCliCtrl.cpteCli.password;
         //= angular.copy(newcpteCliCtrl.cpteCli);

        $http.post(apiRestUrl,compteClient)
        .then(function(){
          $location.path("/home");
        });
        console.log(compteClient);
    };

});
