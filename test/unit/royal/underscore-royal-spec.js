describe( "underscore-royal.js mixins", function()
{
	describe("_.mapEach(list, iterator, context)", function()
	{
		it( "returns an indexed object of return values from the function " +
				"\"iterator\" when \"list\" is an object", function()
		{
			var object = { name: "Edward", gender: "male", country: "us" };
			var func = function(value, key) { return value.length; };

			results = _.mapEach( object, func );

			expect( results ).toEqual( { name: 6, gender: 4, country: 2 } );
		});
	});
});