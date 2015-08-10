angular.module('ecMobileApp.connexion')
.controller('modalInstanceConnexionCtrl', function ($modalInstance, info) {
	 var mdlInstConnexCtrl = this;

	 mdlInstConnexCtrl.info = info;

	 mdlInstConnexCtrl.ok = function () {
	   $modalInstance.close();
	};
});