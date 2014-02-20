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

	himeModule.controller( "AreaPathsController", function($scope, actorService, areaService, actorAreaRelationshipSystem)
	{
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

		$scope.$watch("getPaths()", function(newValue, oldValue)
		{
			$scope.$evalAsync("paths = getPaths()");
		}, true);
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

	var areaRelationshipSystem = $relationship.buildRelationshipSystem();

	himeModule.controller( "AreaEditControl", function( $scope, areaData )
	{
		var areaService = $area.buildAreaService( areaRelationshipSystem, areaData );

		$scope.areas = areaService.areas;

		$scope.createArea = function(areaName, areaKey)
		{
			var area = $area.buildArea(areaName, areaKey);
			$scope.areas[area.key] = area;
		};

		$scope.removeArea = function(area)
		{
			// Remove Area Paths
			var relatedAreas = areaRelationshipSystem.getRelatedNodes(area);
			_.each(relatedAreas, function(relatedArea)
			{
				areaRelationshipSystem.removeRelationship(area, relatedArea);
			});

			// Remove Area
			delete areaService.areas[area.key];
		};

		$scope.createPath = function(areaAKey, areaBKey, pathDistance)
		{
			var areaA = $scope.areas[areaAKey];
			var areaB = $scope.areas[areaBKey];

			var data = areaRelationshipSystem.createRelationship(areaA, areaB);
			data.distance = pathDistance;

			$scope.areaCodeA = null;
			$scope.areaCodeB = null;
			$scope.pathDistance = null;
		};
		
		$scope.selectArea = function(areaKey)
		{
			if( $scope.areaCodeA == null || $scope.areaCodeA.trim() == "" )
			{
				$scope.areaCodeA = areaKey;
			} 
			else if( $scope.areaCodeB == null || $scope.areaCodeB.trim() == "" )
			{
				$scope.areaCodeB = areaKey;
			}
		};
		
		$scope.generateJson = function()
		{
			var areaJson = areaService.toJson();
			$scope.generatedJson = JSON.stringify( areaJson );
		};
	});
	
	himeModule.controller( "AreaEditNode", function($scope)
	{
		$scope.getPaths = function(area)
		{
			var relatedAreas = areaRelationshipSystem.getRelatedNodes(area);
			
			var paths = _.map(relatedAreas, function(relatedArea)
			{
				var path = {};
				path.area = relatedArea;

				var data = areaRelationshipSystem.getRelationship(area, relatedArea);
				path.distance = data.distance;

				return path;
			});
			
			return paths;
		};

		$scope.removePath = function(fromArea, toArea)
		{
			areaRelationshipSystem.removeRelationship(fromArea, toArea);
		};

		$scope.$watch("getPaths(area)", function(newValue, oldValue)
		{
			$scope.$evalAsync("paths = getPaths(area)");
		}, true);
	});
};