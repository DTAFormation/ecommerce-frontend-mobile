describe('E2E : test protractor de l affichage des commandes',function(){

	it ('Test affichage commandes d un client', function(){
		browser.get(browser.baseUrl);
		element(by.id('connexion')).click();
		expect(browser.getLocationAbsUrl()).toEqual('/connexion');

		//attention mettre un couple (identifiant,mdp) de connexion valide
		element(by.name("loginConnexion")).sendKeys('loginDeNathan');
		element(by.name("mdpConnexion")).sendKeys('pwdDeNathan');
		element(by.id('seConnecter')).click();
		element(by.id('modalConnexionOk')).click();

		element(by.id('compte')).click();
		element(by.id('commandes')).click();
		
		expect(browser.getLocationAbsUrl()).toEqual('/compteClient/commandes');

		var allCommandes = element/*.all*/(by.id('affichageCommande'));

		expect(allCommandes.isPresent()).toBeTruthy();

		/*A FINIR*/
	});
});

