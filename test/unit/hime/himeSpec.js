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
		
		describe( "getProgress( actor )", function()
		{
			it( "returns \"null\" if the specified actor is null", function()
			{
				expect( hime.getProgress() ).toEqual( null );
			});
		});
	});
});
