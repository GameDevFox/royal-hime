describe( "math", function() 
{
	var math = namespace.getPath( "com.everempire.royal.math" );
	
	describe( "filters", function() 
	{
		describe( "linear", function() 
		{
			it( "returns theta as-is", function() 
			{
				var theta = 0.123;
				
				var out = math.filters.linear( theta );
				expect( out ).toEqual( theta );
			});
		});
	});
});