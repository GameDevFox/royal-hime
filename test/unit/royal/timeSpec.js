describe( "time", function()
{
	var time = namespace.getPath( "com.everempire.royal.time" );
	
	describe( "ManualClock", function() 
	{
		it( "returns the time that is passed to it", function()
		{
			var manualClock = new time.ManualClock();
			
			manualClock.setTime( 1234 );
			expect( manualClock.getTime() ).toEqual( 1234 );
		});
	})
});