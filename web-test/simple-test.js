var expect = require("chai").expect;

var webDriver = require("selenium-webdriver");

var driver = new webDriver.Builder().
	usingServer("http://localhost:4444/wd/hub").
	withCapabilities(webDriver.Capabilities.firefox()).
	build();
var by = webDriver.By;

describe("Royal Hime Client", function()
{
	before(function()
	{
		driver.get("localhost:8000");
	});

	it("should have the title \"Royal Hime\"", function(done)
	{
		var clockMsgElem;

		this.timeout(10000);

		driver.getTitle().
		then(function(title)
		{
			expect(title).to.equal("Royal Hime");
			done();
		});
	});

	it("shoule have a \"stop\" button that stops game clock", function(done)
	{
		var stopButton = driver.findElement(by.className("stop"));
		stopButton.click();

		driver.findElement(by.css(".clockController .message")).
		then(function(clockMsgElem)
		{
			return clockMsgElem.getText();
		}).
		then(function(text)
		{
			expect(text).to.not.be.null;
			done();
		});
	});
});
