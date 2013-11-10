describe( "A room", function() 
{
	var area = getPath( "com.everempire.hime.area" );
	
	it( "can be built", function() 
	{
		var myRoom = area.buildArea( "My Room" );
		expect( myRoom.name ).toBe( "My Room" );
	});
});
