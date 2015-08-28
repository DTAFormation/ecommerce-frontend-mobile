describe('productServiceTest',function(){
	var apiRestUrl="http://5.196.89.85:9080/ec-backend/api/user";
	beforeEach(function(){
		module('ecMobileApp.compteClient');
	});


it("Le service compteClientService.updateClient(client)"+
        " doit envoyer une requete PUT avec les infos", inject(function(compteClientService, $httpBackend){
        var client={id:'1',nom:'nom',prenom:'prenom',login:'login'};
        $httpBackend.expectPUT(apiRestUrl, client).respond(200, '');
        compteClientService.updateClient(client);
        $httpBackend.flush();
    }));
});