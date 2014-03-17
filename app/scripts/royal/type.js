(function() 
{
	namespace.namespace( "com.everempire.royal.type", function() 
	{
		var $func = namespace.getNode("com.everempire.royal.func");

		var buildType = function(constructor)
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
		this.buildType = buildType;

		// Helper functions
		var buildLogicalTypeFunction = function(iterativeFunction)
		{
			var logicalTypeFunc = function()
			{
				// TODO: Replace with generic function
				var types = Array.prototype.slice.call(arguments, 0);

				var typeFunc = function(value)
				{
					var result = iterativeFunction(types, function(type)
					{
						return type(value);
					});

					return result;
				};

				return typeFunc;
			};

			return logicalTypeFunc;
		};

		var and = buildLogicalTypeFunction(_.all);
		this.and = and;

		var or = buildLogicalTypeFunction(_.any);
		this.or = or;

		var not = function(type)
		{
			var notFunc = function()
			{
				return !type.apply(this, arguments);
			};

			return notFunc;
		};
		this.not = not;
		
		// Native types
		var nativeTypes = [Number, String, Boolean, Object, Array, Function, Date, RegExp];

		_.each(nativeTypes, function(type)
		{
			var typeName = $func.getName(type);
			var typeFuncName = "is"+typeName;
			this[typeFuncName] = buildType(type);
		},
		this);

		var isUndefined = function(value)
		{
			return typeof(value) == "undefined";
		};
		this.isUndefined = isUndefined;

		var isNull = function(value)
		{
			return !isUndefined(value) && value == null;
		};
		this.isNull = isNull;

		// Simple Types
		// TODO: Build these with validated function builder
		var isNumber = this.isNumber;
		
		var isInteger = function(value)
		{
			return isNumber(value) && (value % 1 == 0);
		};
		this.isInteger = isInteger;

		var isPositive = function(value)
		{
			return isNumber(value) && value > 0;
		};
		this.isPositive = isPositive;
		
		// Composite Types
		var isEmpty = or(isUndefined, isNull);
		this.isEmpty = isEmpty;
	});
}());