define(function()
{
	var setOpName = "set";

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

	dataPoint.bindBeforeSet = function(point, func)
	{
		var oldFunc = point[setOpName];

		var newFunc = function(arg)
		{
			var result = func.call(point, arg);
			result = oldFunc.call(point, result);
			return result;
		};

		point[setOpName] = newFunc;
	};

	dataPoint.bindAfterSet = function(point, func)
	{
		var oldFunc = point[setOpName];

		var newFunc = function(arg)
		{
			var result = oldFunc.call(point, arg);
			result = func.call(point, result);
			return result;
		};

		point[setOpName] = newFunc;
	};

	return dataPoint;
});
