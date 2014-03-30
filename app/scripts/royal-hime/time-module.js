(function()
{
	angular.module( "Time", [], function( $provide, $controllerProvider, $compileProvider, $filterProvider )
	{
		var math = namespace.getNode("com.everempire.royal.math");
		var time = namespace.getNode("com.everempire.royal.time");

		var area = namespace.getNode("com.everempire.hime.area");

		// TODO: [prince] This is a hack way to update activity service
		$compileProvider.directive( "eeRefresh", function( $frameProvider, gameClock, activityService )
		{
			var directiveDefinition =
			{
				link: function( scope, element, attrs )
				{
					// TODO: [prince] Implements config
					var framesPerSecond =  attrs["eeRefresh"];
					var millisPerFrame = 1000 / framesPerSecond;

					// TODO: [prince] Don't DI frameProvidor, just build a new one
					$frameProvider.frame( function( startTime, endTime )
					{
						// TODO: [prince] Still need to fix stuff here, not very neat
						//scope.time = gameClock.getTime();
						gameClock.DeltaClock.lap();
						var time = gameClock.getTime();

						// TODO: [prince] restore activity service, have some way to register with clock?
						activityService.setTime( time );
						scope.$apply();
					});
				}
			};

			return directiveDefinition;
		});

		$filterProvider.register( "time", function()
		{
			return time.formatTime;
		});

		$provide.factory( "$frameProvider" , function()
		{
			// TODO: [prince] Factor out this clock
			var clock = new time.buildSystemClock();

			var frameProvider =
			{
				intervalHandle: null,
				frameHandlers: [],

				lastTime: 0,
				thisTime: 0,

				frame: function( func )
				{
					this.frameHandlers.push( func );
				},

				start: function()
				{
					var frameProvider = this;

					// TODO: [prince] Wait for $interval to be supported in stable version
					this.intervalHandle = setInterval( function()
					{
						frameProvider.lastTime = frameProvider.thisTime;
						frameProvider.thisTime = clock.getTime();

						frameProvider.dispatchFrame( frameProvider.lastTime, frameProvider.thisTime );

					}, 16); // Increment triggers 60 times per second ( 1000 / 16ms )

					// TODO: [prince] Make "framesPerSecond" configurable
				},

				stop: function()
				{
					if( this.intervalHandle != null )
					{
						clearInterval( this.intervalHandle );
					}
				},

				dispatchFrame: function( startTime, endTime )
				{
					for( var i in this.frameHandlers )
					{
						var frameHandler = this.frameHandlers[i];
						frameHandler.call( this, startTime, endTime );
					}
				},
			};

			frameProvider.start();

			return frameProvider;
		});
	});
}());
