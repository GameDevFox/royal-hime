describe( "type", function()
{
	var type = namespace.getNode( "com.everempire.royal.type" );
	
	describe( "isNull()", function()
	{
		it( 'returns "true" when passed "null"', function()
		{
			var isNull = type.isNull( null );
			expect( isNull ).toEqual( true );
		});
	});
	
	describe( "isBoolean()", function()
	{
		it( 'returns "true" when passed "true"', function()
		{
			var isBoolean = type.isBoolean( true );
			expect( isBoolean ).toEqual( true );
		});
		
		it( 'returns "false" when passed a non-boolean', function()
		{
			var isBoolean = type.isBoolean( 13 );
			expect( isBoolean ).toEqual( false );
		});
	});
	
	describe( "isNumber()", function()
	{
		it( 'returns "true" when passed a number', function()
		{
			var isNumber = type.isNumber( 13 );
			expect( isNumber ).toEqual( true );
		});
		
		it( 'returns "false" when passed a non-number', function()
		{
			var isNumber = type.isNumber( "13" );
			expect( isNumber ).toEqual( false );
		});
	});
	
	describe( "isString()", function()
	{
		it( 'returns "true" when passed a string', function()
		{
			var isString = type.isString( "13" );
			expect( isString ).toEqual( true );
		});
		
		it( 'returns "false" when passed a non-string', function()
		{
			var isString = type.isString( 13 );
			expect( isString ).toEqual( false );
		});
	});
	
	describe( "isFunction()", function()
	{
		it( 'returns "true" when passed a function', function()
		{
			var isFunction = type.isFunction( function() { console.log( "Hello World" ); } );
			expect( isFunction ).toEqual( true );
		});
		
		it( 'returns "false" when passed a non-function', function()
		{
			var isFunction = type.isFunction( "Hello World" );
			expect( isFunction ).toEqual( false );
		});
	});
	
	describe( "isArray()", function()
	{
		it( "returns true when passed an array", function()
		{
			var isArray = type.isArray( [ 1, 2, 3 ] );
			expect( isArray ).toEqual( true );
		});
		
		it( "returns false when passed a non-array", function()
		{
			var isArray = type.isArray( "1, 2, 3" );
			expect( isArray ).toEqual( false );
		});
	});
	
	describe( "isObject()", function()
	{
		it( "returns false when passed a non-object", function()
		{
			var isObject = type.isObject( "object" );
			expect( isObject ).toEqual( false );
		});
	});
	
	describe( "isEmpty()", function()
	{
		it( 'returns true when passed "undefined"', function()
		{
			var isEmpty = type.isEmpty( undefined );
			expect( isEmpty ).toEqual( true );
		});
		
		it( 'returns true when passed "null"', function()
		{
			var isEmpty = type.isEmpty( null );
			expect( isEmpty ).toEqual( true );
		});
		
		it( 'returns true when passed a non-empty value', function()
		{
			var isEmpty = type.isEmpty( "empty" );
			expect( isEmpty ).toEqual( false );
		});
	});
	
	describe( "getType()", function()
	{
		it( 'returns "null" when passed null', function()
		{
			var getType = type.getType( null );
			expect( getType ).toEqual( "null" );
		});
		
		it( 'returns "string" when passed a string', function()
		{
			var getType = type.getType( "type" );
			expect( getType ).toEqual( "string" );
		});
	});
});