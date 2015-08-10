describe('userServiceTest', function() {

	var mockUser=[{id : null, nom:"romain", prenom:"romain", login:"truc", password:""}];

    beforeEach(function() {
        module("ecMobileApp.shared");
    });

    it("Connecte un utilisateur", inject(function(userService, $httpBackend, $q, $controller){
		//var userConnect={login:"truc",password:"machin"};
		
		$httpBackend.when('POST', 'http://localhost:8080/ecommerce-backend/api/personne/connect',
			function(postdata){
				expect(postdata.prenom).toBe(mockUser[0].prenom);
				expect(postdata.nom).toBe(mockUser[0].nom);
				expect(postdata.login).toBe(mockUser[0].login);
				expect(postdata.password).toBe(mockUser[0].password);
				expect(postdata.id).toBe(mockUser[0].id);
				expect(userService.isConnected()).toBe(true);

		}).respond(200, true);
		
		/**/


	}));

});
