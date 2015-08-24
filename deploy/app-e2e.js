describe('E2E: ecDesktopCtrl', function () {

  it('should work', function () {
    browser.get(browser.baseUrl);

    var appName = element(by.css('title'));

    expect(appName.isPresent()).toBeTruthy();
  });

});
