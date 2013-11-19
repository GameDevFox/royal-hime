describe( "hime", function() 
{
	var $hime = namespace.getNode( "com.everempire.hime" );
	
	describe( "Hime", function() 
	{
		it( "Create an instance of the game", function() 
		{
			var hime = new $hime.Hime();
			
			expect( hime ).not.toEqual( undefined );
		});
	});
});
