var expect = require("chai").expect;

var webDriver = require("selenium-webdriver");

var driver = new webDriver.Builder().
	withCapabilities(webDriver.Capabilities.chrome()).
	build();
var by = webDriver.By;

describe("this test", function()
{
	after(function()
	{
		driver.quit();
	});

	it("should work", function(done)
	{
		var title;
		var clockMsgElem;

		this.timeout(10000);

		driver.get("localhost:8000");

		driver.getTitle().then(function(t) { title = t; });

		var stopButton = driver.findElement(by.className("stop"));
		stopButton.click();

		var clockMsg = driver.findElement(by.css(".clockController .message"));
		clockMsg.then(function(elem)
		{
			clockMsgElem = elem;
			return clockMsgElem.getText();
		})
		.then(function(text)
		{
			expect(text).to.not.be.null;
			expect(title).to.equal("Royal Hime");

			done();
		});
	});
});

