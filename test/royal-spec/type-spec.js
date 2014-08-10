define(["royal/type"], function($type)
{
	describe( "royal/type", function()
	{
		describe("buildType(constructor)", function()
		{
			it("returns a type function from the constructor", function()
			{
				var isString = $type.buildType(String);

				expect(isString(null)).toBe(false);
				expect(isString(123)).toBe(false);
				expect(isString("123")).toBe(true);

				var isNumber = $type.buildType(Number);

				expect(isNumber(null)).toBe(false);
				expect(isNumber(123)).toBe(true);
				expect(isNumber("123")).toBe(false);
			});
		});

		describe( "isNull()", function()
		{
			it( 'returns "true" when passed "null"', function()
			{
				var isNull = $type.isNull( null );
				expect( isNull ).toEqual( true );
			});
		});

		describe( "isBoolean()", function()
		{
			it( 'returns "true" when passed "true"', function()
			{
				var isBoolean = $type.isBoolean( true );
				expect( isBoolean ).toEqual( true );
			});

			it( 'returns "false" when passed a non-boolean', function()
			{
				var isBoolean = $type.isBoolean( 13 );
				expect( isBoolean ).toEqual( false );
			});
		});

		describe( "isNumber()", function()
		{
			it( 'returns "true" when passed a number', function()
			{
				var isNumber = $type.isNumber( 13 );
				expect( isNumber ).toEqual( true );
			});

			it( 'returns "false" when passed a non-number', function()
			{
				var isNumber = $type.isNumber( "13" );
				expect( isNumber ).toEqual( false );
			});
		});

		describe( "isString()", function()
		{
			it( 'returns "true" when passed a string', function()
			{
				var isString = $type.isString( "13" );
				expect( isString ).toEqual( true );
			});

			it( 'returns "false" when passed a non-string', function()
			{
				var isString = $type.isString( 13 );
				expect( isString ).toEqual( false );
			});
		});

		describe( "isFunction()", function()
		{
			it( 'returns "true" when passed a function', function()
			{
				var isFunction = $type.isFunction( function() { console.log( "Hello World" ); } );
				expect( isFunction ).toEqual( true );
			});

			it( 'returns "false" when passed a non-function', function()
			{
				var isFunction = $type.isFunction( "Hello World" );
				expect( isFunction ).toEqual( false );
			});
		});

		describe( "isArray()", function()
		{
			it( "returns true when passed an array", function()
			{
				var isArray = $type.isArray( [ 1, 2, 3 ] );
				expect( isArray ).toEqual( true );
			});

			it( "returns false when passed a non-array", function()
			{
				var isArray = $type.isArray( "1, 2, 3" );
				expect( isArray ).toEqual( false );
			});
		});

		describe( "isObject()", function()
		{
			it( "returns false when passed a non-object", function()
			{
				var isObject = $type.isObject( "object" );
				expect( isObject ).toEqual( false );
			});
		});

		describe( "isEmpty()", function()
		{
			it( 'returns true when passed "undefined"', function()
			{
				var isEmpty = $type.isEmpty(undefined);
				expect(isEmpty).toEqual(true);
			});

			it( 'returns true when passed "null"', function()
			{
				var isEmpty = $type.isEmpty(null);
				expect(isEmpty).toEqual(true);
			});

			it( 'returns true when passed a non-empty value', function()
			{
				var isEmpty = $type.isEmpty("empty");
				expect(isEmpty).toEqual(false);
			});
		});

		describe("and(types...)", function()
		{
			it("creates a new type that is \"true\" is ALL subtypes are \"true\"", function()
			{
				var isPostiveInteger = $type.and($type.isInteger, $type.isPositive);

				expect(isPostiveInteger(null)).toBe(false);
				expect(isPostiveInteger("123")).toBe(false);
				expect(isPostiveInteger(0)).toBe(false);
				expect(isPostiveInteger(123.5)).toBe(false);
				expect(isPostiveInteger(-123)).toBe(false);

				expect(isPostiveInteger(123)).toBe(true);
			});
		});

		describe("or(types...)", function()
		{
			it("creates a new type that is \"true\" is ONE OR MORE subtypes are \"true\"", function()
			{
				var isPostiveInteger = $type.or($type.isInteger, $type.isPositive);

				expect(isPostiveInteger(null)).toBe(false);
				expect(isPostiveInteger("123")).toBe(false);
				expect(isPostiveInteger(0)).toBe(true);
				expect(isPostiveInteger(123.5)).toBe(true);
				expect(isPostiveInteger(-123)).toBe(true);
				expect(isPostiveInteger(-123.5)).toBe(false);
				expect(isPostiveInteger(123)).toBe(true);
			});
		});

		describe("not(type)", function()
		{
			it("returns a function that is the inverse of the given type function", function()
			{
				var isPostiveInteger = $type.or($type.isInteger, $type.isPositive);
				var isNotPositiveInteger = $type.not(isPostiveInteger);

				expect(isNotPositiveInteger(null)).toBe(true);
				expect(isNotPositiveInteger("123")).toBe(true);
				expect(isNotPositiveInteger(0)).toBe(false);
				expect(isNotPositiveInteger(123.5)).toBe(false);
				expect(isNotPositiveInteger(-123)).toBe(false);
				expect(isNotPositiveInteger(-123.5)).toBe(true);
				expect(isNotPositiveInteger(123)).toBe(false);
			});
		});

		describe("has(key, value)", function()
		{
			var player;
			var data;
			var number;

			beforeEach(function()
			{
				player =
				{
					name: "Prince",
					hp: 100,
					gold: 500
				};

				data = [1, "Two", 3];

				number = 13;
			});

			it("returns a type function that returns true if the object has" +
					"a value indexed by \"key\"", function()
			{
				var hasName = $type.has("name");
				var hasHP = $type.has("hp");
				var hasItems = $type.has("items");

				var hasFirst = $type.has(0);
				var hasThird = $type.has(2);
				var hasFourth = $type.has(3);

				expect(hasName(player)).toBe(true);
				expect(hasHP(player)).toBe(true);
				expect(hasItems(player)).toBe(false);
				expect(hasFirst(player)).toBe(false);
				expect(hasThird(player)).toBe(false);
				expect(hasFourth(player)).toBe(false);

				expect(hasName(data)).toBe(false);
				expect(hasHP(data)).toBe(false);
				expect(hasItems(data)).toBe(false);
				expect(hasFirst(data)).toBe(true);
				expect(hasThird(data)).toBe(true);
				expect(hasFourth(data)).toBe(false);

				expect(hasName(number)).toBe(false);
				expect(hasHP(number)).toBe(false);
				expect(hasItems(number)).toBe(false);
				expect(hasFirst(number)).toBe(false);
				expect(hasThird(number)).toBe(false);
				expect(hasFourth(number)).toBe(false);
			});

			it("with \"type\" it also makes sure that the value indexd by " +
					"\"key\" is the type provided",
				function()
			{
				var hasName = $type.has("name", $type.isString);
				var hasHP = $type.has("hp", $type.isNumber);
				var hasGold = $type.has("gold", $type.isString);
				var hasItems = $type.has("items", $type.isArray);

				var hasFirst = $type.has(0, $type.isNumber);
				var hasSecond = $type.has(1, $type.isNumber);
				var hasFourth = $type.has(3, $type.isNumber);

				expect(hasName(player)).toBe(true);
				expect(hasHP(player)).toBe(true);
				expect(hasGold(player)).toBe(false);
				expect(hasItems(player)).toBe(false);
				expect(hasFirst(data)).toBe(true);
				expect(hasSecond(data)).toBe(false);
				expect(hasFourth(data)).toBe(false);
			});

			it("can be used to express object types", function()
			{
				var notQuiteAPlayer =
				{
					name: "Prince",
					hp: "100",	// Since "hp" is a string, it doesn't
								// match the "Player" type
					gold: 500
				};

				var isPlayer = $type.and(
					$type.isObject,
					$type.has("name", $type.isString),
					$type.has("hp", $type.isNumber),
					$type.has("gold", $type.isNumber)
				);

				expect(isPlayer(player)).toBe(true);
				expect(isPlayer(notQuiteAPlayer)).toBe(false);
			});
		});
	});
});
