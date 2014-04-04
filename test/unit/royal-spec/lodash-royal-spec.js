define(["royal/lodash-royal"], function(_)
{
	describe( "royal/lodash-royal", function()
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

		describe("_.mapByName(collection, keyIterator, valueIterator, context)", function()
		{
			it("behaves like _.zipObject but accepts and returns multiple values", function()
			{
				var objects =_.zipObjects(
						// Keys
						["name", "age", "gender"],
						// Values
						["James", 24, "m"],
						["Sue", 21, "f"],
						["John", 32, "m"]
				);

				expect(objects).toEqual([
					{ "name": "James", "age": 24, "gender": "m" },
					{ "name": "Sue", "age": 21, "gender": "f" },
					{ "name": "John", "age": 32, "gender": "m" }
				]);
			});
		});
	});
});
