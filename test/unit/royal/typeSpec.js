describe( "type", function() 
{
	var type = namespace.getPath( "com.everempire.royal.type" );
	
	describe( "isArray()", function() 
	{
		it( "returns true when passed an array", function()
		{
			var myArray = [ 1, 2, 3 ];
			
			var isArray = type.isArray( myArray );
			expect( isArray ).toEqual( true );
		})
	});
})