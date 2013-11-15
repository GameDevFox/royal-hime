describe( "actor", function() 
{
	var actor = namespace.getPath( "com.everempire.hime.actor" );
	
	describe( "buildActor()", function() 
	{
		it( "builds an actor", function() 
		{
			var myActor = actor.buildActor( "Prince", 120 );
			
			expect( myActor ).not.toEqual( undefined );
		});
	});
});
