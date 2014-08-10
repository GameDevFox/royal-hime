var expect = require("chai").expect;

var $type = require("../../src/royal/type");

describe( "royal/type", function()
{
        describe("buildType(constructor)", function()
        {
                it("returns a type function from the constructor", function()
                {
                        var isString = $type.buildType(String);

                        expect(isString(null)).to.be.false;
                        expect(isString(123)).to.be.false;
                        expect(isString("123")).to.be.true;

                        var isNumber = $type.buildType(Number);

                        expect(isNumber(null)).to.be.false;
                        expect(isNumber(123)).to.be.true;
                        expect(isNumber("123")).to.be.false;
                });
        });

        describe( "isNull()", function()
        {
                it( 'returns "true" when passed "null"', function()
                {
                        var isNull = $type.isNull( null );
                        expect( isNull ).to.be.true;
                });
        });

        describe( "isBoolean()", function()
        {
                it( 'returns "true" when passed "true"', function()
                {
                        var isBoolean = $type.isBoolean( true );
                        expect( isBoolean ).to.be.true;
                });

                it( 'returns "false" when passed a non-boolean', function()
                {
                        var isBoolean = $type.isBoolean( 13 );
                        expect( isBoolean ).to.be.false;
                });
        });

        describe( "isNumber()", function()
        {
                it( 'returns "true" when passed a number', function()
                {
                        var isNumber = $type.isNumber( 13 );
                        expect( isNumber ).to.be.true;
                });

                it( 'returns "false" when passed a non-number', function()
                {
                        var isNumber = $type.isNumber( "13" );
                        expect( isNumber ).to.be.false;
                });
        });

        describe( "isString()", function()
        {
                it( 'returns "true" when passed a string', function()
                {
                        var isString = $type.isString( "13" );
                        expect( isString ).to.be.true;
                });

                it( 'returns "false" when passed a non-string', function()
                {
                        var isString = $type.isString( 13 );
                        expect( isString ).to.be.false;
                });
        });

        describe( "isFunction()", function()
        {
                it( 'returns "true" when passed a function', function()
                {
                        var isFunction = $type.isFunction( function() { console.log( "Hello World" ); } );
                        expect( isFunction ).to.be.true;
                });

                it( 'returns "false" when passed a non-function', function()
                {
                        var isFunction = $type.isFunction( "Hello World" );
                        expect( isFunction ).to.be.false;
                });
        });

        describe( "isArray()", function()
        {
                it( "returns true when passed an array", function()
                {
                        var isArray = $type.isArray( [ 1, 2, 3 ] );
                        expect( isArray ).to.be.true;
                });

                it( "returns false when passed a non-array", function()
                {
                        var isArray = $type.isArray( "1, 2, 3" );
                        expect( isArray ).to.be.false;
                });
        });

        describe( "isObject()", function()
        {
                it( "returns false when passed a non-object", function()
                {
                        var isObject = $type.isObject( "object" );
                        expect( isObject ).to.be.false;
                });
        });

        describe( "isEmpty()", function()
        {
                it( 'returns true when passed "undefined"', function()
                {
                        var isEmpty = $type.isEmpty(undefined);
                        expect(isEmpty).to.be.true;
                });

                it( 'returns true when passed "null"', function()
                {
                        var isEmpty = $type.isEmpty(null);
                        expect(isEmpty).to.be.true;
                });

                it( 'returns true when passed a non-empty value', function()
                {
                        var isEmpty = $type.isEmpty("empty");
                        expect(isEmpty).to.be.false;
                });
        });

        describe("and(types...)", function()
        {
                it("creates a new type that is \"true\" is ALL subtypes are \"true\"", function()
                {
                        var isPostiveInteger = $type.and($type.isInteger, $type.isPositive);

                        expect(isPostiveInteger(null)).to.be.false;
                        expect(isPostiveInteger("123")).to.be.false;
                        expect(isPostiveInteger(0)).to.be.false;
                        expect(isPostiveInteger(123.5)).to.be.false;
                        expect(isPostiveInteger(-123)).to.be.false;

                        expect(isPostiveInteger(123)).to.be.true;
                });
        });

        describe("or(types...)", function()
        {
                it("creates a new type that is \"true\" is ONE OR MORE subtypes are \"true\"", function()
                {
                        var isPostiveInteger = $type.or($type.isInteger, $type.isPositive);

                        expect(isPostiveInteger(null)).to.be.false;
                        expect(isPostiveInteger("123")).to.be.false;
                        expect(isPostiveInteger(0)).to.be.true;
                        expect(isPostiveInteger(123.5)).to.be.true;
                        expect(isPostiveInteger(-123)).to.be.true;
                        expect(isPostiveInteger(-123.5)).to.be.false;
                        expect(isPostiveInteger(123)).to.be.true;
                });
        });

        describe("not(type)", function()
        {
                it("returns a function that is the inverse of the given type function", function()
                {
                        var isPostiveInteger = $type.or($type.isInteger, $type.isPositive);
                        var isNotPositiveInteger = $type.not(isPostiveInteger);

                        expect(isNotPositiveInteger(null)).to.be.true;
                        expect(isNotPositiveInteger("123")).to.be.true;
                        expect(isNotPositiveInteger(0)).to.be.false;
                        expect(isNotPositiveInteger(123.5)).to.be.false;
                        expect(isNotPositiveInteger(-123)).to.be.false;
                        expect(isNotPositiveInteger(-123.5)).to.be.true;
                        expect(isNotPositiveInteger(123)).to.be.false;
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

                        expect(hasName(player)).to.be.true;
                        expect(hasHP(player)).to.be.true;
                        expect(hasItems(player)).to.be.false;
                        expect(hasFirst(player)).to.be.false;
                        expect(hasThird(player)).to.be.false;
                        expect(hasFourth(player)).to.be.false;

                        expect(hasName(data)).to.be.false;
                        expect(hasHP(data)).to.be.false;
                        expect(hasItems(data)).to.be.false;
                        expect(hasFirst(data)).to.be.true;
                        expect(hasThird(data)).to.be.true;
                        expect(hasFourth(data)).to.be.false;

                        expect(hasName(number)).to.be.false;
                        expect(hasHP(number)).to.be.false;
                        expect(hasItems(number)).to.be.false;
                        expect(hasFirst(number)).to.be.false;
                        expect(hasThird(number)).to.be.false;
                        expect(hasFourth(number)).to.be.false;
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

                        expect(hasName(player)).to.be.true;
                        expect(hasHP(player)).to.be.true;
                        expect(hasGold(player)).to.be.false;
                        expect(hasItems(player)).to.be.false;
                        expect(hasFirst(data)).to.be.true;
                        expect(hasSecond(data)).to.be.false;
                        expect(hasFourth(data)).to.be.false;
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

                        expect(isPlayer(player)).to.be.true;
                        expect(isPlayer(notQuiteAPlayer)).to.be.false;
                });
        });
});