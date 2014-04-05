define(["./func"], function($func)
{
	var $type = {};

	$type.buildType = function(constructor)
	{
		var type = $func.getName(constructor);

		var typeFunc = function(value)
		{
			if(value == null)
			{
				return false;
			}

			var valueType = $func.getName(value.constructor);
			return valueType == type;
		};
		return typeFunc;
	};

	// Helper functions
	var buildLogicalTypeFunction = function(iterativeFunc)
	{
		var logicalTypeFunc = function()
		{
			// TODO: Replace with generic function
			var types = Array.prototype.slice.call(arguments, 0);

			var typeFunc = function(value)
			{
				var result = iterativeFunc(types, function(type)
				{
					return type(value);
				});

				return result;
			};

			return typeFunc;
		};

		return logicalTypeFunc;
	};

	$type.and = buildLogicalTypeFunction(_.all);
	$type.or = buildLogicalTypeFunction(_.any);

	$type.not = function(type)
	{
		var notFunc = function()
		{
			return !type.apply(this, arguments);
		};

		return notFunc;
	};

	// Native types
	var nativeTypes = [Number, String, Boolean, Object, Array, Function, Date, RegExp];

	_.each(nativeTypes, function(type)
	{
		var typeName = $func.getName(type);
		var typeFuncName = "is"+typeName;
		$type[typeFuncName] = $type.buildType(type);
	});

	$type.isUndefined = function(value)
	{
		return typeof(value) == "undefined";
	};

	$type.isNull = function(value)
	{
		return !$type.isUndefined(value) && value == null;
	};

	// Simple Types
	// TODO: Build these with validated function builder
	$type.isInteger = function(value)
	{
		return $type.isNumber(value) && (value % 1 == 0);
	};

	$type.isPositive = function(value)
	{
		return $type.isNumber(value) && value > 0;
	};

	// Composite Types
	$type.isEmpty = $type.or($type.isUndefined, $type.isNull);

	// TODO: Types are (notNull?) and (function)
	$type.has = function(key, type)
	{
		var result;
		if(type != undefined)
		{
			result = function(value)
			{
				var keyValue = value[key];
				return keyValue != undefined && type(keyValue);
			}
		}
		else
		{
			result = function(value)
			{
				return value[key] != undefined;
			}
		}
		return result;
	}

	return $type;
});
