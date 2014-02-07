describe( "area", function() 
{
	var area = namespace.getNode( "com.everempire.hime.area" );

	describe( "buildArea()", function() 
	{
		var roomName = "My Room";
		var myRoom;

		beforeEach( function() 
		{
			myRoom = area.buildArea( "My Room" );
		});

		it( "builds an area", function() 
		{
			expect( myRoom ).not.toEqual( undefined );
		});

		it( "assigns it the given name", function() 
		{
			expect( myRoom.name ).toEqual( roomName );
		});
	});
});
