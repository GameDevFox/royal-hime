describe( "lodash-royal.js mixins", function()
{
	describe("_.mapByName(collection, keyIterator, valueIterator, context)", function()
	{
		it("maps \"keys\" to \"values\" based upon the results of the " +
				"\"keyIterator\" and \"valueIterator\" respectively", function()
		{
			var keyIterator = function(value, key, collection)
			{
				return key+"One";
			};

			var valueIterator = function(value, key, collection)
			{
				return value.length;
			};

			var obj = { first: "Ice Cream", second: "Jello", last: "Chocolate" };

			var result = _.mapByName(obj, keyIterator, valueIterator);
			expect(result).toEqual({ firstOne: 9, secondOne: 5, lastOne: 9 });
		});
	});
});