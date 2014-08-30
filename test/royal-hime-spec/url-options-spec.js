var expect = require("chai").expect;

var urlOptions = require("royal-hime/url-options");

describe("url-options(url)", function()
{
	it("returns a set of options based on the query string of the given url", function()
	{
		var options = urlOptions("http://localhost?debug=true&dataPath=path/to/data/");
		expect(options).to.deep.equal({ debug: true, dataPath: "path/to/data/" });
	});

	it('adds a slash to the end of "dataPath" it one isn\'t already there', function()
	{
		var options = urlOptions("http://localhost?dataPath=path/to/data");
		expect(options).to.deep.equal({ debug: false, dataPath: "path/to/data/" });
	});

	it("returns default values if no applicable query variables are present", function()
	{
		var options = urlOptions("http://localhost");
		expect(options).to.deep.equal({ debug: false, dataPath: "data/" });

		var options = urlOptions("http://localhost?first=one&second=two");
		expect(options).to.deep.equal({ debug: false, dataPath: "data/" });
	});

	it('throws an error if an invalid value if "debug" is set to an invalid value', function()
	{
		expect(function()
		{
			urlOptions("http://localhost?debug=false");
		}).
		not.to.throw();

		expect(function()
		{
			urlOptions("http://localhost?debug=yes");
		}).
		to.throw(Error, /Expecting either "true" or "false"/);
	});
});