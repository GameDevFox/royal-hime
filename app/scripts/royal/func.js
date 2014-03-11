(function()
{
	namespace.namespace( "com.everempire.royal.func", function()
	{
		this.getName = function(func)
		{
			var funcStr = func.toString();

			var spaceIdx = funcStr.indexOf(" ");
			var paranIdx = funcStr.indexOf("(");

			var funcName = funcStr.substring(spaceIdx+1, paranIdx);
			return funcName;
		};

		this.getArgs = function(func)
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
	});
}());