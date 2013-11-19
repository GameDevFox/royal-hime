describe( "activityService", function() 
{
	var $activity = namespace.getNode( "com.everempire.hime.activity" );
	
	var activityService;
	var activityComplete;
	
	var activity = function()
	{
		activityComplete = true;
	};
	
	beforeEach( function() 
	{
		activityService = $activity.buildActivityService();
		activityService.updateTime( 1000 );
		
		activityComplete = false;
	});
	
	describe( "addActivity()", function() 
	{
		it( "schedules an activity that will be called at the given time", function() 
		{
			activityService.addActivity( activity, 1000 );
			activityService.updateTime( 1000 ); 
			
			expect( activityComplete ).toEqual( true );
		});
		
		it( "schedules an activity that will not be called before the given time", function() 
		{
			activityService.addActivity( activity, 1000 );
			activityService.updateTime( 999 ); 
			
			expect( activityComplete ).toEqual( false );
		});
		
		it( "throws an exception with 1 argument", function()
		{
			var addActivityWithOneArgument = function()
			{
				activityService.addActivity( Object.prototype.toString );
			};
			
			expect( addActivityWithOneArgument ).toThrow();
		});
		
		it( "throws an exception with more than 3 arguments", function()
		{
			var addActivityWithMoreThanThreeArguments = function()
			{
				activityService.addActivity( Object.prototype.toString, 2, 3, 4 );
			};
			
			expect( addActivityWithMoreThanThreeArguments ).toThrow();
		});
	});
} );