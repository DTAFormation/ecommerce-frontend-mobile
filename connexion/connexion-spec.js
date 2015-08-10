describe("Test des controllers du module connexion", function() {

	beforeEach(function() {
        module("ecMobileApp.connexion");
    });

	//var fakeStorage=["infosUser":{id:null,nom:"romain",prenom:"prenom",login:"truc",password:"machin"}];;

	it("Connecte un utilisateur controller", inject(function(userService, $httpBackend, $q, $controller,$invalid){
		$httpBackend.expect('POST', 'http://localhost:8080/ecommerce-backend/api/personne/connect').respond(200);
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