describe("Test des controllers du module connexion", function() {

	var urlLogin="http://5.196.89.85:9080/ec-backend/api/user/connect";

	beforeEach(function() {
        module("ecMobileApp.connexion");
    });

	//var fakeStorage=["infosUser":{id:null,nom:"romain",prenom:"prenom",login:"truc",password:"machin"}];;

	it("Connecte un utilisateur controller", inject(function($httpBackend){
		$httpBackend.expect('POST', urlLogin).respond(200);
		/*var modalConnexionCtrl=$controller("modalInstanceConnectionCtrl");
			modalConnexionCtrl.mdlInstConnexCtrl.info="hop";
			spyOn(modalConnexionCtrl,'open');*/
			/*var connexCtrl= $controller("connexionController");
			//spyOn(userService, "login").and.returnValue();
			spyOn(connexCtrl,'open');
			var form = {
				$invalid : false
			};
			connexCtrl.connexion(form);
			$httpBackend.flush();

			expect(connexCtrl.open).toHaveBeenCalledWith("");*/
		//connexCtrl.

	}));
});