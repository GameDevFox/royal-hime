define(["royal/data-point"], function(dataPoint)
{
	describe("royal/data-point", function()
	{
		describe("buildGetterAndSetter(model)", function()
		{
			it("returns a \"get()\" and \"set()\" function that access \"model\"", function()
			{
				var x = 10;
				var xPoint = dataPoint.buildGetterAndSetter(x);

				expect(xPoint.get()).toEqual(10);
				xPoint.set(13);
				expect(xPoint.get()).toEqual(13);
			});
		});
	});
});
