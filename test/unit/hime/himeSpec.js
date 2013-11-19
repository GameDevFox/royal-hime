describe( "hime", function() 
{
	var $hime = namespace.getNode( "com.everempire.hime" );
	
	describe( "Hime", function() 
	{
		var hime;
		
		beforeEach( function() 
		{
			hime = new $hime.Hime();
		});
		
		it( "Create an instance of the game", function() 
		{
			expect( hime ).not.toEqual( undefined );
		});
		
		describe( "getProgress()", function()
		{
			it( "returns \"null\" if there is no selected actor", function()
			{
				expect( hime.getProgress() ).toEqual( null );
			});
		});
	});
});
