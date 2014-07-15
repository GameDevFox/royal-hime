define(["lodash"], function(_)
{
	var setOpName = "set";

	var dataPoint = {};

	dataPoint.buildPoint = function(initialValue)
	{
		var model = initialValue;

		var point = {};

		point.get = function()
		{
			return model;
		};

		point.set = function(value)
		{
			model = value;
			return model;
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

	dataPoint.attachOnSet = function(point)
	{
		var onSetFuncs = [];

		dataPoint.bindAfterSet(point, function(arg)
		{
			_(onSetFuncs).each(function(setFunc)
			{
				setFunc(arg);
			});
		});

		point.onSet = function(func)
		{
			onSetFuncs.push(func);
			return point;
		};

		point.offSet = function(func)
		{
			_(onSetFuncs).remove(_.partial(_.isEqual, func));
			return point;
		};
	};

	dataPoint.buildExprPoint = function()
	{
		var point = buildPoint();

		var func = _(arguments).shift();
		var args = arguments;

		point.eval = function()
		{
			var value = func.apply(this, args);
			point.set(value);
		};

		_(args).each(function(depPoint)
		{
			// TODO: Include check to attach "onSet" if it doesn't exist
			depPoint.onSet(point.eval);
		});

		point.eval();

		dataPoint.attachOnSet(point);
		var pointCopy = _.clone(point);
		delete pointCopy.set;

		return pointCopy;
	};

	return dataPoint;
});
