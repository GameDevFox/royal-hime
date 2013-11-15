describe( "area", function() 
{
	var area = namespace.getPath( "com.everempire.hime.area" );
	
	it( "can be built", function() 
	{
		var myRoom = area.buildArea( "My Room" );
		expect( myRoom.name ).toBe( "My Room" );
	});
});
