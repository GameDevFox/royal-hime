describe( "time", function()
{
	var time = namespace.getNode( "com.everempire.royal.time" );
	
	describe( "ManualClock", function() 
	{
		it( "returns the time that is passed to it", function()
		{
			var manualClock = new time.ManualClock();
			
			manualClock.setTime( 1234 );
			expect( manualClock.getTime() ).toEqual( 1234 );
		});
	});
	
	describe( "buildFullClock()", function() 
	{
		it( "builds a full clock", function()
		{
			var clock = time.buildFullClock();
			
			expect( clock ).not.toEqual( undefined );
		});
	});
});