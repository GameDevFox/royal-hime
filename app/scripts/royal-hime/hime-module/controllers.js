define(["../area"], function($area)
{
	var controllerFactory = {};

	controllerFactory.build = function( himeModule )
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
			$scope.isAutoBoost = true;

			// Functions
			$scope.completeNextActivity = activityService.completeNextActivity;
			$scope.completeAllActivities = activityService.completeAllActivities;
			$scope.hasActiveActivity = activityService.hasActiveActivity;
		});

		himeModule.controller( "MoveActivityController", function($scope, actorService, areaService, activityService, actorAreaRelationshipSystem)
		{
			var baseSpeed = 1.2; // Meters per second
			var baseEnergyRate = 1.0; // Energy depletion rate

			$scope.getSpeed = function()
			{
				return $scope.running ? baseSpeed * 2 : baseSpeed;
			};

			$scope.getEnergyRate = function()
			{
				return $scope.running ? baseEnergyRate * 2 : baseEnergyRate;
			};

			$scope.hasActivity = function()
			{
				var hasActivity;

				// "try" block in case of null pointer
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

			$scope.isActorSelected = function()
			{
				return actorService.selectedActor != null;
			};

			$scope.move = function( areaKey )
			{
				// TODO: [prince] Clean this up
				var actor = actorService.selectedActor;

				var fromArea = actorAreaRelationshipSystem.getRelatedNode(actor);
				var toArea = areaService.areas[areaKey];

				// Get relationship data (if any) between "fromArea" to "toArea"
				var data = areaService.areaRelationshipSystem.getRelationship(fromArea, toArea);
				if( data == null )
				{
					console.log( "There is no path for area code: " + $scope.areaName );
					return;
				}

				// Calculate required time to move
				var timeElapsed = data.distance / $scope.getSpeed();

				// Deplete energy
				actor.energy -= ($scope.getEnergyRate() * timeElapsed) / 100;

				// Add Move Activity
				actor.activityId = activityService.addActivity( function()
				{
					actorAreaRelationshipSystem.removeRelationship(actor, fromArea);
					actorAreaRelationshipSystem.createRelationship(actor, toArea);

					actor.activityId = null;
				}, timeElapsed * 1000 );

				// Clear pathNumber
				$scope.pathNumber = null;

				var hasActivity = function(actor)
				{
					return actor.activityId != null;
				};

				// Optionally engage "auto-boost"
				if($scope.isAutoBoost && _.all(actorService.actors, hasActivity))
				{
					// TODO: Don't auto boost if waiting would be shorter
					activityService.completeNextActivity();
				}
			};
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

		//////////////////////////
		// AREA EDIT CONTROLLER //
		//////////////////////////

		var areaRelationshipSystem = null;
		himeModule.controller( "AreaController", function( $scope, areaData )
		{
			var areaService = $area.buildAreaService( areaRelationshipSystem, areaData );

			$scope.areas = areaService.areas;

			$scope.createArea = areaService.createArea;
			$scope.removeArea = areaService.removeArea;

			$scope.createPath = function(areaAKey, areaBKey, pathDistance)
			{
				areaService.createPath(areaAKey, areaBKey, pathDistance);

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
			$scope.removePath = areaRelationshipSystem.removeRelationship;

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

			$scope.$watch("getPaths(area)", function(newValue, oldValue)
			{
				$scope.$evalAsync("paths = getPaths(area)");
			}, true);
		});
	};

	return controllerFactory;
});
