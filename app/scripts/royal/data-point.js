define(function()
{
	var dataPoint = {};

	dataPoint.buildGetterAndSetter = function(model)
	{
		var getter = function()
		{
			return model;
		};

		var setter = function(value)
		{
			model = value;
		};

		var point =
		{
			get: getter,
			set: setter
		};

		return point;
	};

	return dataPoint;
});
