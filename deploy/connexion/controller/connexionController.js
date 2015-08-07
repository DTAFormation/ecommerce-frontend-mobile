angular.module('ecMobileApp.connexion')
.controller('connexionController', function(userService, $location, $modal){
	var connexCtrl=this;
	connexCtrl.msg="";

	console.log("Connexion controller");
	connexCtrl.connexion=function(form){
	console.log("Connexion controller connexion method");
			
			
	userService.login(connexCtrl.userData.login,connexCtrl.userData.password)
				.then(function(){
					if(userService.isConnected()){
						connexCtrl.open("Connexion réussie, "+userService.getInfosUser().prenom+
						" "+userService.getInfosUser().nom+" . Redirection vers la page d'accueil.");
						//connexCtrl.msg="Connexion réussie, "+userService.getInfosUser().prenom+
						//" "+userService.getInfosUser().nom+" . Redirection vers la page d'accueil.";
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