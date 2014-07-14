define(["royal/data-point"], function(dataPoint)
{
	describe("royal/data-point", function()
	{
		describe("buildPoint(model)", function()
		{
			it("returns a point with a \"get()\" and \"set()\" function that access \"model\"", function()
			{
				var x = 10;
				var point = dataPoint.buildPoint(x);

				expect(point.get()).toEqual(10);
				point.set(13);
				expect(point.get()).toEqual(13);
				expect(x).toEqual(10);
			});
		});

		var point;
		beforeEach(function()
		{
			point = dataPoint.buildPoint(10);
		});

		describe("bindBeforeSet(point, func)", function()
		{
			it("bind a function to be called before a point's operation", function()
			{
				var oldValue = null;
				var valueArg = null;
				dataPoint.bindBeforeSet(point, function(value)
				{
					oldValue = this.get();
					valueArg = value;
					return value + 5;
				});

				expect(oldValue).toEqual(null);
				expect(valueArg).toEqual(null);
				expect(point.get()).toEqual(10);

				point.set(13);

				expect(oldValue).toEqual(10);
				expect(valueArg).toEqual(13);
				expect(point.get()).toEqual(18);
			});
		});

		describe("bindAfterSet(point, func)", function()
		{
			it("bind a function to be called after a point's operation", function()
			{
				var newValue = null;
				var valueArg = null;
				dataPoint.bindAfterSet(point, function(value)
				{
					newValue = this.get();
					valueArg = value;
					return value;
				});

				expect(newValue).toEqual(null);
				expect(valueArg).toEqual(null);
				expect(point.get()).toEqual(10);

				point.set(13);

				expect(newValue).toEqual(13);
				expect(valueArg).toEqual(13);
				expect(point.get()).toEqual(13);
			});
		});
	});
});
