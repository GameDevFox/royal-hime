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
});