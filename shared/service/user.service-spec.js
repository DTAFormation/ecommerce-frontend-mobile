describe('userServiceTest', function() {

	var mockUser=[{id : null, nom:"romain", prenom:"romain", login:"truc", password:"pass"}];
	var mockUserData={login:"login", password:"pwd"};

    beforeEach(function() {
        module("ecMobileApp.shared");
    });

    it("Connecte un utilisateur", inject(function(userService, $httpBackend, $localStorage){
		
		$httpBackend.
			expect("POST","http://5.196.89.85:9080/ec-backend/api/user/connect", mockUserData).
			respond(200, mockUser[0]); // expect du post de la methode login(login,pwd) // si la reponse est ok(200) on envoie les infoUser du mockUser

		userService.login("login","pwd");
		$httpBackend.flush(); // on declenche a ce moment car asynchrone. Si il est declenche a la fin le isConnected n'est tjs pas affecté à true

		expect(userService.isConnected()).toEqual(true); // l'utilisateur doit etre connecte
		expect(userService.getInfosUser()).toEqual(mockUser[0]); // les infos retournees par le getInfosUser doivent etre egales au mockUser
		
	}));


});
