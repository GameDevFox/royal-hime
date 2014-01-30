describe( "com.everempire.royal.utils", function() 
{
	var $utils = namespace.getNode( "com.everempire.royal.utils" );
	
	describe( "getType( arg )", function() 
	{
		it( "returns the type of its argument under normal circumstances " +
				"(i.e. Not object, array or null) ", function() 
		{
			expect( $utils.getType( "Hello" ) ).toEqual( "string" );
			expect( $utils.getType( 13 ) ).toEqual( "number" );
			expect( $utils.getType( function() { return; } ) ).toEqual( "function" );
		});
		
		it( "returns \"object\" for an object", function()
		{
			expect( $utils.getType( {} ) ).toEqual( "object" );
		});
		
		it( "returns \"array\" for an array", function()
		{
			expect( $utils.getType( [] ) ).toEqual( "array" );
		});
		
		it( "returns \"null\" for null", function()
		{
			expect( $utils.getType( null ) ).toEqual( "null" );
		});
	});
	
	describe( "addElement( iterable, key, value )", function()
	{
		it( "adds an indexed value to an object", function() 
		{
			var object = {};
			
			$utils.addElement( object, "name", "Edward" );
			expect( object ).toEqual( { name: "Edward" } );
		});
		
		it( "adds an element to an array (no index)", function() 
		{
			var array = [];
			
			$utils.addElement( array, "name", "Edward" );
			expect( array ).toEqual( [ "Edward" ] );
		});
	});
	
	describe( "each( iterable, func )", function() 
	{
		it( "applies the function \"func\" to each element in the iterable", 
				function() 
		{
			var sum = 0;
			
			var array = [ 1, 3, 7, 10 ];
			var func = function( value, key ) { sum += value; };
			
			$utils.each( array, func );
			
			expect( sum ).toEqual( 21 );
		});
		
		it( "returns an array of return values from the function \"func\" " +
				"when iterable is an array", function()
		{
			var array = [ 1, 3, 7, 10 ];
			var func = function( value, key ) { return value + parseInt(key) + 1; };
			
			results = $utils.each( array, func );
			
			expect( $utils.getType( results ) ).toEqual( "array" );
			expect( results ).toEqual( [ 2, 5, 10, 14 ] );
		});
		
		it( "returns an indexed object of return values from the function " +
				"\"func\" when iterable is an object", function()
		{
			var object = { name: "Edward", gender: "male", country: "us" };
			var func = function( value, key ) { return value.length; };
			
			results = $utils.each( object, func );
			
			expect( $utils.getType( results ) ).toEqual( "object" );
			expect( results ).toEqual( { name: 6, gender: 4, country: 2 } );
		});
		
	});
});