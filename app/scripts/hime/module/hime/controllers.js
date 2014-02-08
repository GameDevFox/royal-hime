var buildControllers = function( himeModule )
{
	himeModule.controller( "ClockController", function( $scope, gameClock ) 
	{
		// Functions
		$scope.getTime = gameClock.getTime;
		$scope.start = gameClock.StopClock.start;
		$scope.stop = gameClock.StopClock.stop;
		$scope.isRunning = gameClock.StopClock.isRunning;
	});
	
	himeModule.controller( "ActorController", function( $scope, actorService ) 
	{
		// Properties
		$scope.actors = actorService.actors;
		
		// Functions
		$scope.select = actorService.select;
		$scope.getSelectedActor = actorService.getSelectedActor;
		$scope.getActivityProgress = actorService.getActivityProgress;
		$scope.getRemainingActivityTime = actorService.getRemainingActivityTime;
		$scope.getCurrentAreaName = actorService.getCurrentAreaName;
	});

	himeModule.controller( "ActivityController", function( $scope, activityService ) 
	{
		// Properties
		// TODO: Better way to do this
		$scope.autoBoost = true;
		
		// Functions
		$scope.boost = activityService.boost;
		$scope.hasActiveActivity = activityService.hasActiveActivity;
	});

	himeModule.controller( "AreaControl", function($scope, actorService, areaService, activityService, actorAreaRelationshipSystem)
	{	
		$scope.speed = 1.2; // Meters per second
		$scope.energyRate = 1.0; // Energy depletion rate
		
		$scope.$watch( 'running', function( newVal, oldVal )
		{
			if( newVal )
			{
				$scope.speed = 2.4;
				$scope.energyRate = 3.0;
			}
			else
			{
				$scope.speed = 1.2;
				$scope.energyRate = 1.0;
			}
		});
		
		$scope.hasActivity = function()
		{
			var hasActivity;
			
			// Try block in case of null pointer
			try 
			{
				hasActivity = actorService.selectedActor.activityId == null;
			}
			catch( e )
			{
				hasActivity = false;
			}
			
			return hasActivity;
		};
		
		$scope.getPaths = function()
		{
			var actor = actorService.selectedActor;
			var area = actorAreaRelationshipSystem.getRelatedNode(actor);

			var relatedAreas = areaService.areaRelationshipSystem.getRelatedNodes(area);

			var paths = {};
			_.each(relatedAreas, function(relatedArea)
			{
				var data = areaService.areaRelationshipSystem.getRelationship(area, relatedArea);
				var path = { area: relatedArea, distance: data.distance };

				paths[relatedArea.key] = path;
			});

			return paths;
		};
		
		$scope.setAreaName = function( areaCode )
		{
			$scope.areaName = areaCode;
		};
		
		$scope.move = function( actor, destAreaPathName )
		{
			// TODO: [prince] Clean this up
			var actor = actorService.selectedActor;
			var fromArea = actorAreaRelationshipSystem.getRelatedNode(actor);
			
			var toAreaKey = $scope.areaName;
			var toArea = areaService.areas[toAreaKey];
			
			// Get relationship data (if any) between "fromArea" to "toArea"
			var data = areaService.areaRelationshipSystem.getRelationship(fromArea, toArea);
			if( data == null )
			{
				console.log( "There is no path for area code: " + $scope.areaName );
				return;
			}
			
			// Calculate required time to move
			var timeElapsed = data.distance / $scope.speed;
			
			// Deplete energy
			actor.energy -= $scope.energyRate * timeElapsed / 100;
			
			// Add Move Activity
			actor.activityId = activityService.addActivity( function()
			{
				actorAreaRelationshipSystem.removeRelationship(actor, fromArea);
				actorAreaRelationshipSystem.createRelationship(actor, toArea);
				
				actor.activityId = null;
			}, timeElapsed * 1000 );
			
			// Clear pathNumber
			$scope.pathNumber = null;
			
			if( $scope.throttle )
			{
				activityService.boost();
			}
		};
	});

	himeModule.controller( "AreaEditControl", function( $scope, $http, $attrs )
	{
		$scope.areaName = "";
		
		// Load Data
		// TODO: Restore this
//		$http.get( $attrs.areaMap ).success( function( data ) {
//			$area.loadAreaData( $scope.areas, data );
//		});
		
		$scope.createArea = function()
		{
			$scope.areas[$scope.areaCode] = {
				"name": $scope.areaName,
				"paths": []
			};
			
			$scope.areaName = null;
			$scope.areaCode = null;
		};
		
		$scope.createPath = function()
		{
			$scope.areas[$scope.areaCodeA].paths[$scope.areaCodeB] = {
				area: $scope.areas[$scope.areaCodeB],
				distance: $scope.pathDistance
			};
			
			$scope.areas[$scope.areaCodeB].paths[$scope.areaCodeA] = {
				area: $scope.areas[$scope.areaCodeA],
				distance: $scope.pathDistance
			};
			
			$scope.areaCodeA = null;
			$scope.areaCodeB = null;
			$scope.pathDistance = null;
		};
		
		$scope.removeArea = function( areaIndex )
		{
			// Remove Area Paths
			var area = $scope.areas[areaIndex];
			for( i in area.paths )
			{
				$scope.removePath( areaIndex, i );
			}
			
			// Remove Area
			delete $scope.areas[areaIndex];
		};
		
		$scope.removePath = function( areaIndex, pathIndex )
		{
			var area = $scope.areas[areaIndex];
			var path = area.paths[pathIndex];
			
			// Remove Foreign Paths
			var foreignPaths = path.area.paths;
			for( i in foreignPaths )
			{
				var foreignPath = foreignPaths[i];
				if( path.distance == foreignPath.distance && area === foreignPath.area )
				{
					foreignPaths.splice( i, 1 );
				}
			}
			
			// Remove Local Path
			area.paths.splice( pathIndex, 1 );
		};
		
		$scope.selectArea = function( areaCode )
		{
			console.log( $scope.areaCodeA );
			
			if( $scope.areaCodeA == null || $scope.areaCodeA.trim() == "" )
			{
				$scope.areaCodeA = areaCode;
			} 
			else if( $scope.areaCodeB == null || $scope.areaCodeB.trim() == "" )
			{
				$scope.areaCodeB = areaCode;
			}
		};
		
		$scope.generateJson = function()
		{
			var areasJson = {};
			
			for( var i in $scope.areas )
			{
				var area = $scope.areas[i];
				
				var areaJson = {
					name: area.name,
					paths: {}
				};
				
				for( var j in area.paths )
				{
					var path = area.paths[j];
					var areaCode = firstIndexOf( $scope.areas, path.area );
					
					var pathJson = { 
						distance: path.distance
					};
					areaJson.paths[areaCode] = pathJson;
				}
				
				areasJson[i] = areaJson;
			}
			
			$scope.generatedJson = JSON.stringify( areasJson );
		};
	});
};