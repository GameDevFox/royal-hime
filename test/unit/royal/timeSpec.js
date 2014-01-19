describe( "time", function()
{
	var time = namespace.getNode( "com.everempire.royal.time" );
	
	var manualClock;
	
	beforeEach( function()
	{
		manualClock = new time.buildManualClock();
		manualClock.setTime( 1234 );
	});
	
	describe( "ManualClock", function() 
	{
		it( "returns the time that is passed to it", function()
		{
			expect( manualClock.getTime() ).toEqual( 1234 );
		});
	});
	
	describe( "PlusClock", function() 
	{
		it( "returns the time of the parent clock, plus an offset", function()
		{
			var plusClock = time.buildPlusClock( manualClock );
			plusClock.setPlusTime( 1000 );

			expect( plusClock.getPlusTime() ).toEqual( 1000 );
			expect( plusClock.getTime() ).toEqual( 2234 );
		});
	});
	
	describe( "StopClock", function() 
	{
		var stopClock;
		
		beforeEach( function()
		{
			stopClock = time.buildStopClock( manualClock );
		});
		
		it( "returns the change in time of the parent clock while StopClock is in a \"running\" state", function()
		{
			expect( stopClock.getTime() ).toEqual( 1234 );
			
			manualClock.setTime( 2000 );
			expect( stopClock.getTime() ).toEqual( 2000 );
			
			stopClock.stop();
			manualClock.setTime( 3000 );
			expect( stopClock.getTime() ).toEqual( 2000 );
			
			stopClock.start();
			manualClock.setTime( 3512 );
			expect( stopClock.getTime() ).toEqual( 2512 );
		});
		
		describe( "start()", function()
		{
			it( "does nothing if StopClock is already running", function()
			{
				expect( stopClock.getTime() ).toEqual( 1234 );
				
				manualClock.setTime( 2000 );
				expect( stopClock.getTime() ).toEqual( 2000 );
				
				stopClock.start();
				manualClock.setTime( 3000 );
				expect( stopClock.getTime() ).toEqual( 3000 );
			});
		});
		
		describe( "stop()", function()
		{
			it( "does nothing if StopClock is not running", function()
			{
				expect( stopClock.getTime() ).toEqual( 1234 );
				
				manualClock.setTime( 2000 );
				expect( stopClock.getTime() ).toEqual( 2000 );
				
				stopClock.stop();
				manualClock.setTime( 3000 );
				expect( stopClock.getTime() ).toEqual( 2000 );
				
				stopClock.stop();
				manualClock.setTime( 3512 );
				expect( stopClock.getTime() ).toEqual( 2000 );
			});
		});
		
		describe( "toggle()", function()
		{
			it( "changes state to \"not running\" if StopClock is \"running\"", function()
			{
				stopClock.setRunning( true );
				expect( stopClock.isRunning() ).toEqual( true );				
				// RUNNING //
				stopClock.toggle();
				// NOT RUNNNING //
				expect( stopClock.isRunning() ).toEqual( false );
			});
			
			it( "changes state to \"running\" if StopClock is \"not running\"", function()
			{
				stopClock.setRunning( false );
				expect( stopClock.isRunning() ).toEqual( false );				
				// NOT RUNNING //
				stopClock.toggle();
				// RUNNNING //
				expect( stopClock.isRunning() ).toEqual( true );
			});
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