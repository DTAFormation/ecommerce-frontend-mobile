describe("Test du controleur compteClient", function() {

	var apiUrl = 'http://5.196.89.85:9080/ec-backend/api/user/chercher/';
	var mockcompteClient = [{nom : "aze", prenom : "aze", login : "aze@aze", password : "azeaze"}];

    beforeEach(function() {
		module("ecMobileApp.compteClient");

	});

	it("test de la fonction doesNotExist doit renvoyer true si le login n'existe pas", inject(function($controller, $httpBackend) {
    var value = "aze@aze";
		$httpBackend.expectGET(apiUrl+value).respond(200, mockcompteClient);
    var newcpteCliCtrl = $controller("newCompteClientCtrl");
    newcpteCliCtrl.doesNotExist("aze@aze").then(function(result){
      expect(result).toEqual(false);
    });
    $httpBackend.flush();
  }));

  it("test de la fonction doesNotExist doit renvoyer false si le login existe", inject(function($controller,$httpBackend) {
    var value = "aze@aze";
    $httpBackend.expectGET(apiUrl+value).respond(404, mockcompteClient);
    var newcpteCliCtrl = $controller("newCompteClientCtrl");
    newcpteCliCtrl.doesNotExist("aze@aze").then(function(resulttrue){
    },function(resultfalse){
      expect(resultfalse).toEqual(true);
    });
    $httpBackend.flush();
  }));

  it("test de la fonction de création d'un nouveau compte (création réussie)", inject(function($controller,$httpBackend) {
		 $httpBackend.expect("POST",'http://5.196.89.85:9080/ec-backend/api/user').respond(200);

		 var newcpteCliCtrl = $controller("newCompteClientCtrl");

		 newcpteCliCtrl.cpteCli = [{nom : "aze", prenom : "aze", login : "aze@aze", password : "azeaze"}];

		 spyOn(newcpteCliCtrl, 'open');

		 var form = {
			 $invalid : false
		 };

		 newcpteCliCtrl.newCpte(form);
		 $httpBackend.flush();

		 expect(newcpteCliCtrl.open).toHaveBeenCalledWith("votre compte à bien été créé");
	 }));

	 it("test de la fonction de création d'un nouveau compte (échec création)", inject(function($controller,$httpBackend) {
		 $httpBackend.expect("POST",'http://5.196.89.85:9080/ec-backend/api/user').respond(404);

		 var newcpteCliCtrl = $controller("newCompteClientCtrl");

		 newcpteCliCtrl.cpteCli = [{nom : "aze", prenom : "aze", login : "aze@aze", password : "azeaze"}];

		 spyOn(newcpteCliCtrl, 'open');

		 var form = {
			 $invalid : false
		 };

		 newcpteCliCtrl.newCpte(form);
		 $httpBackend.flush();

			expect(newcpteCliCtrl.open).toHaveBeenCalledWith("erreur lors de la création de votre compte \n Veuillez réessayer.");
		}));
});
