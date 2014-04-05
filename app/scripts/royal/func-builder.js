define(function()
{
	var $funcBuilder = {};

	$funcBuilder.buildValidatedFunc = function(types, func)
	{
		var validatedFunc = function()
		{
			var args = arguments;
			var exceptions = [];

			// Validate Arguments
			_.each(types, function(isType, index)
			{
				var arg = args[index];

				if(!isType(arg))
				{
					var exception =
					{
						message: "Argument is invalid",
						type: isType,
						argIndex: index,
						argValue: arg
					};
					exceptions.push(exception);
				}
			});

			if(exceptions.length > 0)
			{
				throw exceptions;
			}

			// If all arguments are valid, call function
			func.apply(this, arguments);
		};

		return validatedFunc;
	};

	$funcBuilder.buildDependentFunc = function(deps, func)
	{
		// Empty
	};

	return $funcBuilder;
});