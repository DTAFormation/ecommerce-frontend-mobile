describe('E2E : ecMobilCtrl',function(){

	it ('Find image', function(){
		browser.get(browser.baseUrl);
		var tablePromotionElement = element(by.id('promotion'));

		expect(tablePromotionElement.isPresent()).toBeTruthy();

		var allRows = tablePromotionElement.all(by.css("tr"));

		// 2 éléments
		expect(allRows.count()).toBeGreaterThan(1);

		var allTd = allRows.all(by.css("td"));

		expect(allTd.count()).toBeGreaterThan(2);

		var img = allTd.all(by.css("img"));

		expect(img.count()).toBe(3);		
	});

	it ('Find product', function(){
		browser.get(browser.baseUrl);
		var tablePromotionElement = element(by.id('promotion'));

		expect(tablePromotionElement.isPresent()).toBeTruthy();

		var allRows = tablePromotionElement.all(by.css("tr"));

		// 2 éléments
		expect(allRows.count()).toBeGreaterThan(1);

		var allTd = allRows.all(by.css("td"));

		expect(allTd.count()).toBeGreaterThan(2);

		var product = element(by.cssContainingText('.product', 'Produit 1'));
		expect(product.isPresent()).toBeTruthy();

	});
});

