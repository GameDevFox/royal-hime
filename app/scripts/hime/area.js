(function()
{
	namespace.namespace( "com.everempire.hime.area", function()
	{
		var loadAreas = function( areaRelationshipSystem, areaDefObj )
		{
			var areas = {};

			// Create Areas
			for( areaVarName in areaDefObj )
			{
				var areaDef = areaDefObj[areaVarName];

				var area = this.buildArea( areaDef.name );
				areas[areaVarName] = area;
			};

			// Bind Areas together via paths
			for( fromAreaKey in areaDefObj )
			{
				var areaDef = areaDefObj[fromAreaKey];

				var fromArea = areas[fromAreaKey];

				for( toAreaKey in areaDef.paths )
				{
					var pathDef = areaDef.paths[toAreaKey];
					var distance = pathDef["distance"];

					var toArea = areas[toAreaKey];

					if( toArea == null )
					{
						throw "Error when creating path for area '" + fromAreaKey + "': Could not find area '" + toAreaKey + "'";
					}

					// Join the Areas together
					var areaRelationship = areaRelationshipSystem.addRelationship( fromArea, toArea );
					areaRelationship.distance = distance;

					//var path = this.buildPath( toArea, distance );
					//paths[toAreaKey] = path;
				}
			}

			return areas;
		};

		this.buildAreaService = function( areaRelationshipSystem, areaData )
		{
			var areaService = {};

			// Load areas and areaRelationshipSystem
			loadAreas( areaRelationshipSystem, areaData );
			areaService.areaRelationshipSystem = areaRelationshipSystem;

			return areaService;
		};

		this.buildArea = function( name ) {

			var area = {
				name: name
			};

			return area;
		};
	});
}());
