define(["royal-hime/activity"], function($activity)
{
	describe( "royal-hime/activity", function(){
		describe( "activityService", function()
		{
			var activityService;

			var activityId;
			var activityComplete;

			var anotherActivityId;
			var anotherActivityComplete;

			var activity = function()
			{
				activityComplete = true;
			};

			var anotherActivity = function()
			{
				anotherActivityComplete = true;
			};

			beforeEach( function()
			{
				activityService = $activity.buildActivityService();
				activityService.updateTime( 1000 );

				activityComplete = false;

				activityId = activityService.addActivity( activity, 1000 );
				anotherActivityId = activityService.addActivity( anotherActivity, 500, 1000 );
			});

			describe( "addActivity( activity, duration )", function()
			{
				it( "schedules an activity that will be complete after the given duration", function()
				{
					activityService.updateTime( 1000 );

					expect( activityComplete ).toEqual( true );
				});

				it( "schedules an activity that will not be be complete after the given duration", function()
				{
					activityService.updateTime( 999 );

					expect( activityComplete ).toEqual( false );
				});

				it( "returns the activityId of the added activity", function()
				{
					expect( activityId ).not.toEqual( null );
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

			describe( "addActivity( activity, offset, duration )", function()
			{
				it( "schedules an activity that will start after offset", function()
				{
					activityService.updateTime( 500 );
					var progress = activityService.getProgress( anotherActivityId );

					expect( progress ).toEqual( 0 );
				});

				it( "schedules an activity that will not start before offset", function()
				{
					activityService.updateTime( 499 );
					var progress = activityService.getProgress( anotherActivityId );

					expect( progress ).toBeLessThan( 0 );
				});

				it( "schedules an activity that will complete after the given duration past the offset", function()
				{
					activityService.updateTime( 1500 );

					expect( anotherActivityComplete ).toEqual( true );
				});

				it( "schedules an activity that will not complete before the given duration past the offset", function()
				{
					activityService.updateTime( 1499 );

					expect( anotherActivityComplete ).toEqual( true );
				});
			});

			describe( "getProgress( activityId )", function()
			{
				it( "returns the progress of an activity by decimal", function()
				{
					var progress = activityService.getProgress( activityId );
					expect( progress ).toEqual( 0 );

					activityService.updateTime( 250 );
					progress = activityService.getProgress( activityId );
					expect( progress ).toEqual( 0.25 );

					activityService.updateTime( 500 );
					progress = activityService.getProgress( activityId );
					expect( progress ).toEqual( 0.75 );

					activityService.updateTime( 210 );
					progress = activityService.getProgress( activityId );
					expect( progress ).toEqual( 0.96 );
				});

				it( "returns negative value for a progress that hasn't started yet", function()
				{
					var progress = activityService.getProgress( activityId );
					expect( progress )
				});

				it( "returns -1 when the activity is complete", function()
				{
					activityService.updateTime( 1000 );
					var progress = activityService.getProgress( activityId );

					expect( progress ).toEqual( -1 );
				});
			});

			describe( "getNextCompletedActivityId()", function()
			{
				it( "returns the activityId of the next activity that will be completed", function()
				{
					var secondActivityId = activityService.addActivity( activity, 500, 1000 );

					var nextActivityId = activityService.getNextCompletedActivityId();

					expect( nextActivityId ).toEqual( activityId );
				});
			});
		});
	});
});
