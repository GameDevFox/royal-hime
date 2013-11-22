(function()
{
	angular.module( "Time", [], function( $provide, $controllerProvider, $compileProvider, $filterProvider )
	{
		var math = namespace.getNode("com.everempire.royal.math");
		var time = namespace.getNode("com.everempire.royal.time");
		
		var area = namespace.getNode("com.everempire.hime.area");
		
		$controllerProvider.register( "ClockControl", function( $scope, $attrs, $frameProvider )
		{
			// NEED MORE VALIDATION HERE
			var	clock = $scope.hime.gameClock;
			
			$scope.fp = $frameProvider;
			
			// Refresh Time
			$frameProvider.frame( function( start, end )
			{
				$scope.time = clock.getTime();
				$scope.hime.activityService.setTime( $scope.time );
				$scope.$apply();
			});
			
			$scope.stopFrames = function()
			{
				this.fp.stop();
			};
			
			$scope.startFrames = function()
			{
				this.fp.start();
			};
		});
		
		$filterProvider.register( "time", function()
		{
			return function( text )
			{			
				var seconds = Math.round( text / 1000 );
				var minutes = null;
				var hours = null;
				var days = null;
				
				if( seconds >= 60 )
				{
					minutes = Math.floor( seconds / 60 );
					seconds = seconds % 60;
				}
				
				if( minutes >= 60 )
				{
					hours = Math.floor( minutes / 60 );
					minutes = minutes % 60;
				}
				
				if( hours >= 24 )
				{
					days = Math.floor( hours / 24 );
					hours = hours % 24;
				}
				
				var msg = "";
				if( days != null )
				{
					msg += " " + days + "d";
				}
				if( hours != null )
				{
					msg += " " + formatDigits( hours, days ) + "h";
				}
				if( minutes != null )
				{
					msg += " " + formatDigits( minutes, hours ) + "m";
				}
				msg += " " + formatDigits( seconds, minutes ) + "s";
			
				return msg;
			};
		});
		
		$provide.factory( "$frameProvider" , function() 
		{
			var clock = new time.SystemClock();
			
			var frameProvider = 
			{	
				intervalHandle: null,
				frameHandlers: [],	
				
				// TODO: [enicholes] Factor out this clock
				
				lastTime: 0,
				thisTime: 0,
				
				frame: function( func ) 
				{
					this.frameHandlers.push( func );
				},
				
				start: function()
				{
					var frameProvider = this;
					
					// TODO: [enicholes] Wait for $interval to be supported in stable version
					this.intervalHandle = setInterval( function() 
					{
						frameProvider.lastTime = frameProvider.thisTime;
						frameProvider.thisTime = clock.getTime();
						
						frameProvider.dispatchFrame( frameProvider.lastTime, frameProvider.thisTime );
						
					}, 16); // Increment triggers 60 times per second ( 1000 / 16ms )
					
					// TODO: [enicholes] Make "framesPerSecond" configurable 
				},
				
				stop: function()
				{
					if( this.intervalHandle != null )
					{
						clearInterval( this.intervalHandle );
					}
				},
				
				dispatchFrame: function( start, end ) 
				{
					for( var i in this.frameHandlers )
					{
						var frameHandler = this.frameHandlers[i];
						frameHandler.call( this, start, end ); 
					}
				},
			};
			
			frameProvider.start();
			
			return frameProvider;
		});
		
		function formatDigits( unit, dependancy ) {
			
			var digits;
			
			if( unit < 10 && dependancy != null )
			{
				digits = "0"+unit;
			}
			else
			{
				digits = unit;
			}
			
			return digits;
		}
	});
}());
