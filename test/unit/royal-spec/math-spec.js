define(["royal/math"], function($math)
{
	describe( "royal/math", function()
	{
		describe("linear(theta)", function()
		{
			it( "returns theta as-is", function()
			{
				var theta = 0.123;

				var out = $math.filters.linear(theta);
				expect(out).toEqual(theta);
			});
		});

		describe("easeInCubic(theta)", function()
		{
			it( "returns an \"easeIn\" curve via theta", function()
			{
				var theta = 0.5;

				var out = $math.filters.easeInCubic(theta);
				expect(out).toEqual(0.875);
			});
		});

		describe("easeOutCubic(theta)", function()
		{
			it( "returns an \"easeOut\" curve via theta", function()
			{
				var theta = 0.5;

				var out = $math.filters.easeOutCubic(theta);
				expect(out).toEqual(0.125);
			});
		});
	});
});
