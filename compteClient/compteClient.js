
// défintion du module compte compteClient

angular.module('ecMobileApp.compteClient', [
      'ngRoute',
      'ecMobileApp.shared',
      'ui.bootstrap',
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

    .when("/compteClient/update",{
      templateUrl : "compteClient/template/updateClient.html",
      controller: "updateClientCtrl",
      controllerAs: 'updCliCtrl'
    });


});

// controller du module compteClient
angular.module('ecMobileApp.compteClient').controller('compteClientCtrl', function(userService) {

    var cpteCliCtrl = this;

});

// controller pour la création d'un nouveau compte Client
angular.module('ecMobileApp.compteClient').controller('newCompteClientCtrl', function(compteClientService, $location, $q, $modal) {
    var newcpteCliCtrl = this;

    newcpteCliCtrl.asyncValidation = true;

    // fonctions de validation avec angular UI, vérification de la non existance de la donnée sur le serveur fonction asynchrone avec $q.
    newcpteCliCtrl.doesNotExist = function(value) {

        return $q(function(resolve, reject) {
          compteClientService.getlogin(value)
            .then(function(response){
                reject(false);
            },function(response){
                resolve(true);
            });
        });

    };

    // récupération et traitement du formulaire
    newcpteCliCtrl.newCpte = function (form){
        if (form.$invalid)
        {

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

        newcpteCliCtrl.cpteCli=null;

        compteClientService.postClient(compteClient).then(function(response){
              newcpteCliCtrl.open("votre compte à bien été créé");
              $location.path("/connexion");
            },function(response) {

              newcpteCliCtrl.open("erreur lors de la création de votre compte \n Veuillez réessayer.");
              $location.path("/compteClient/new");
            }
          );
    };


    // function d'ouverture de la modale.
    newcpteCliCtrl.open = function (string) {
        var modalInstance = $modal.open({
        animation: true,
        templateUrl: "compteClient/template/creationModal.html",
        controller: "ModalInstanceCtrl",
        controllerAs: "mdlInstCtrl",
        resolve: {
          info: function () {
            return string;
          }
        }
      });
    };

});
angular.module('ecMobileApp.compteClient').controller('ModalInstanceCtrl', function ($modalInstance, info) {
  var mdlInstCtrl = this;

  mdlInstCtrl.info = info;

  mdlInstCtrl.ok = function () {
    $modalInstance.close();
  };
});

angular.module('ecMobileApp.compteClient').controller('updateClientCtrl', function(compteClientService,$location){
    var updatectrl = this;

    compteClientService.getById()
    .then(function(client){
      updatectrl.client = client;
      console.log(updatectrl.client);
    });

    compteClientService.getById();

    updatectrl.update = function(form){
      compteClientService.updateClient(updatectrl.client)
      .then(function(success){
        $location.path("#/");
      }, function(fail){
        console.log("Echec de la mise à jour du client");
      });
    };

});
