define(["royal/math"], function($math)
{
	describe( "royal/math", function()
	{
		it( "returns theta as-is", function()
		{
			var theta = 0.123;

			var out = $math.filters.linear( theta );
			expect( out ).toEqual( theta );
		});
	});
});