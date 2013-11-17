angular.module( "Area", [], function( $controllerProvider ) 
{
	var math = namespace.getNode("com.everempire.royal.math");

	var area = namespace.getNode("com.everempire.hime.area");
	
	$controllerProvider.register( "AreaControl", function( $scope )
	{
		$scope.throttle = true;
		
		window.game = $scope;
		
		$scope.speed = 1.2; // Meters per second
		$scope.energyRate = 1.0; // Energy depletion rate
		
		$scope.$watch('running', function(newVal, oldVal)
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
		
		$scope.setAreaName = function( areaCode )
		{
			$scope.areaName = areaCode;
		};
		
		$scope.move = function()
		{
			var selectedActor = $scope.selectedActor;
			
			// Get and Validate chosen path
			var path = $scope.areas[selectedActor.parentAreaId].paths[$scope.areaName];
			if( path == null )
			{
				console.log( "There is no path for area code: " + $scope.areaName );
				$scope.exits();
				return;
			}
			
			// Calculate required time to move
			var timeElapsed = path.distance / $scope.speed;
			
			if( $scope.throttle )
			{
				$scope.gameClock.MotionClock.move( timeElapsed * 1000, 1500 );
			}
			
			var selectedActor = $scope.selectedActor;
			
			// Deplete energy
			selectedActor.energy -= $scope.energyRate * timeElapsed / 100;
			
			// Add Move Activity
			selectedActor.activityId = window.activityService.addActivity( function()
			{
				var areaId = firstIndexOf( $scope.areas, path.area )
				selectedActor.parentAreaId = areaId;
				
				selectedActor.activityId = null;
			}, timeElapsed * 1000 );
			
			// Clear pathNumber
			$scope.pathNumber = null;
		};
	});
	
	$controllerProvider.register( "AreaEditControl", function( $scope, $http, $attrs )
	{
		$scope.areaName = "";
		
		// Load Data
		$http.get( $attrs.areaMap ).success( function( data ) {
			$scope.areas = area.loadAreas( data );
		});
		
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
});