define(["lodash"], function(_)
{
	var $func = {};

	$func.getName = function(func)
	{
		var funcStr = func.toString();

		var spaceIdx = funcStr.indexOf(" ");
		var paranIdx = funcStr.indexOf("(");

		var funcName = funcStr.substring(spaceIdx+1, paranIdx);
		return funcName;
	};

	$func.getArgs = function(func)
	{
		var funcStr = func.toString();

		var openingParanIdx = funcStr.indexOf("(");
		var closingParanIdx = funcStr.indexOf(")");

		var argsStr = funcStr.substring(openingParanIdx+1, closingParanIdx).trim();
		var argParts = argsStr.split(",");

		// Pass in pre-defined "trim" funciton here instead to creating an inline function
		var args = _.map(argParts, function(argStr)
		{
			return argStr.trim();
		});

		return args;
	};

	$func.get = function(object, propertyName)
	{
		return object[propertyName];
	};

	$func.set = function(object, propertyName, value)
	{
		object[propertyName] = value;
	};

	return $func;
});
