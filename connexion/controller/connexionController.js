angular.module('ecMobileApp.connexion')
.controller('connexionController', function(userService){
	var connexCtrl=this;
	connexCtrl.msg="";
	var userData={
		userLogin:"",
		mdp:""
	};
	console.log("Connexion controller");
	connexCtrl.connexion=function(form){
			console.log("Connexion controller connexion method");
			//if(form.$invalid) return;
			
			userService.login(userData.userLogin,userData.mdp)
				.then(function(result){
					if(result.response===200){
						connexCtrl.msg="Connexion réussie, "+userService.getInfosUser().prenom+
						" "+userService.getInfosUser().nom+" . Redirection vers la page d'accueil.";
					}else{
						connexCtrl.msg="Echec de la connexion.";
					}
				});
		};


});