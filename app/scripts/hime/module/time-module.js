var time = getPath("com.everempire.time");

angular.module( "Time", [], function( $provide, $controllerProvider, $compileProvider, $filterProvider )
{	
	$controllerProvider.register( "Clock", function( $scope, $attrs )
	{
		// NEED MORE VALIDATION HERE
		$scope.$parent[$attrs.name] = getPath( $attrs.path );
	});
	
	$controllerProvider.register( "ClockControl", function( $scope, $attrs, $frameProvider )
	{
		// NEED MORE VALIDATION HERE
		var	clock = $scope[$attrs.clock];
		
		$scope.fp = $frameProvider;
		
		// Refresh Time
		$frameProvider.frame( function( start, end )
		{
			$scope.time = clock.getTime();
			window.activityService.updateTime( $scope.time );
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
	
	$compileProvider.directive("empEffect", function()
	{
		return function( scope, element, attrs )
		{	
			var effectName = attrs.name;
			
			scope[effectName] = {
					
					type: attrs.type,
					duration: attrs.duration,
					
					intervalRef: null,
					
					rootProgress: 1,
					progress: 1,
					
					filter: function( value )
					{
						switch( this.type )
						{
							case "easeInCubic":
								return Math.pow( value - 1, 3 ) + 1;
								break;
							case "easeOutCubic":
								return Math.pow( value , 3 );
								break;
							case "linear":
								return value;
								break;
							case "none":
							default:
								return 1;
								break;
						};
					},
					
					start: function() 
					{
						var effect = this;
						
						if( this.intervalRef == null )
						{
							this.intervalRef = setInterval( function() 
							{
								if( effect.rootProgress != 1 )
								{
									effect.rootProgress =  Math.min( 1, effect.rootProgress + ( 0.016 / ( effect.duration / 1000 ) ) );
									effect.progress = effect.filter( effect.rootProgress );
									scope.$apply();
								}
							}, 16);
						}
					},
					
					stop: function()
					{
						clearInterval( this.intervalRef() );
					}
			};
		};
	});
	
	$filterProvider.register( "numericMotion", function()
	{
		var lastValue = null;
		var delta = 0;
		
		return function( text, effect )
		{	
			if( lastValue == null )
			{
				lastValue = text;
			}
			
			if( text != lastValue )
			{
				delta = text - lastValue;
				lastValue = text;
				effect.rootProgress = 0;
				effect.progress = 0;
				
				effect.start();
			}
			
			var value = lastValue - ( delta * ( 1 - effect.progress ) );

			return value;
		};
	});
	
	$filterProvider.register( "time", function()
	{
		return function( text )
		{			
			var seconds = Math.floor( text / 1000 );
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