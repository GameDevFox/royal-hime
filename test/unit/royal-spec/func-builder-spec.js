define(["royal/func-builder", "royal/type"], function($funcBuilder, $type)
{
	describe("royal/func-builder", function()
	{
		describe("buildValidatedFunc(types, func)", function()
		{
			var getException = function(func)
			{
				var exception = null;

				try
				{
					func();
				}
				catch(e)
				{
					exception = e;
				}

				return exception;
			}

			it("returns a function that throws an exception if the argument types don't match on invocation", function()
			{
				var isPositiveInteger = $type.and($type.isPositive, $type.isInteger);
				var isNotNull = $type.not($type.isNull);

				var validatedFunc = $funcBuilder.buildValidatedFunc(
						[isPositiveInteger, isNotNull, $type.isFunction],
						function(positiveInteger, notNull, func)
						{
							return func(positiveInteger, notNull);
						}
				);

				var funcA = function() { validatedFunc(-20, "Hello World", function() {}) };
				var expectedExceptionA = [{ message: "Argument is invalid", type: isPositiveInteger, argIndex: 0, argValue: -20 }];
				expect(getException(funcA)).toEqual(expectedExceptionA);

				var funcB = function() { validatedFunc(20, null, function() {}) };
				var expectedExceptionB = [{ message: "Argument is invalid", type: isNotNull, argIndex: 1, argValue: null }];
				expect(getException(funcB)).toEqual(expectedExceptionB);

				var funcC = function() { validatedFunc(null, "Hello World", true) };
				var expectedExceptionC = [{ message: "Argument is invalid", type: isPositiveInteger, argIndex: 0, argValue: null },
					{ message: "Argument is invalid", type: $type.isFunction, argIndex: 2, argValue: true }];
				expect(getException(funcC)).toEqual(expectedExceptionC);

				var funcD = function() { validatedFunc(20, "Hello World", function() {}) };
				expect(getException(funcD)).toEqual(null);
			});
		});
		
		describe("buildDependentFunc(deps, func)", function()
		{
			it("does something", function()
			{
				var func = $funcBuilder.buildDependentFunc({
					// Function dependencies
				}, function()
				{
					// Base function
				});
				expect(true).toBe(false);
			});
		});
	});
});
