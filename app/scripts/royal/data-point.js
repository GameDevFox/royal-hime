define(function()
{
	var dataPoint = {};

	dataPoint.buildPoint = function(initialValue)
	{
		var model = initialValue;

		var getter = function()
		{
			return model;
		};

		var setter = function(value)
		{
			model = value;
			return model;
		};

		var point =
		{
			get: getter,
			set: setter
		};

		return point;
	};

	dataPoint.bindBefore = function(point, opName, func)
	{
		var oldFunc = point[opName];

		var newFunc = function(arg)
		{
			var result = func.call(point, arg);
			result = oldFunc.call(point, result);
			return result;
		};

		point[opName] = newFunc;
	};

	dataPoint.bindAfter = function(point, opName, func)
	{
		var oldFunc = point[opName];

		var newFunc = function(arg)
		{
			var result = oldFunc.call(point, arg);
			result = func.call(point, result);
			return result;
		};

		point[opName] = newFunc;
	};

	return dataPoint;
});
