var activity = getPath( "com.everempire.hime.activity" );

describe( "Activity Service", function() 
{
	var activityService;
	
	beforeEach( function() 
	{
		activityService = activity.buildActivityService();
		activityService.updateTime( 1000 );
	});
	
	describe( "- addActivity()", function() 
	{
		it( "throws an exception with 1 argument", function()
		{
			var addActivityWithOneArgument = function()
			{
				activityService.addActivity( function() { console.log( "My Activity" ); } );
			};
			
			expect( addActivityWithOneArgument ).toThrow();
		});
		
		it( "throws an exception with more than 3 arguments", function()
		{
			var addActivityWithMoreThanThreeArguments = function()
			{
				activityService.addActivity( function() { console.log( "My Activity" ); }, 2, 3, 4 );
			};
			
			expect( addActivityWithMoreThanThreeArguments ).toThrow();
		});
	});
} );