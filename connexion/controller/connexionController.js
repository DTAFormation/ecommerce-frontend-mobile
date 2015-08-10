angular.module('ecMobileApp.connexion')
.controller('connexionController', function(userService, $localStorage, $location, $modal, $rootScope){
	var connexCtrl=this;
	connexCtrl.msg="";

	connexCtrl.connexion=function(form){
		userService.login(connexCtrl.userData.login,connexCtrl.userData.password)
			.then(function(){
				if(userService.isConnected()){
					connexCtrl.open("Connexion réussie, "+$localStorage.infosUser.prenom+
					" "+$localStorage.infosUser.nom+" . Redirection vers la page d'accueil.");
					
					$location.path("/");
				}else{
					connexCtrl.open("Echec de la connexion");
				}
		});
	};

	connexCtrl.open = function (string) {
       var modalInstance = $modal.open({
       animation: true,
       templateUrl: "connexion/template/connexionModal.tpl.html",
       controller: "modalInstanceConnexionCtrl",
       controllerAs: "mdlInstConnexCtrl",
       resolve: {
         info: function () {
           return string;
         }
       }
     });
   };
});
