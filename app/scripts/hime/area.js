(function()
{
	namespace.namespace( "com.everempire.hime.area", function()
	{
		var buildArea = function( name, key ) {

			var area = {
				name: name,
				key: key
			};

			return area;
		};
		this.buildArea = buildArea;

		var loadAreaData = function( areaService, areaData )
		{
			// Load areas
			var areas = areaService.areas;
			for( areaKey in areaData )
			{
				var areaDef = areaData[areaKey];
				var area = buildArea( areaDef.name, areaKey );

				// Add area
				areas[areaKey] = area;
			};

			//Load areaRelationshipSystem
			var areaRelationshipSystem = areaService.areaRelationshipSystem;
			for( fromAreaKey in areaData )
			{
				var areaDef = areaData[fromAreaKey];

				var fromArea = areas[fromAreaKey];

				for( toAreaKey in areaDef.paths )
				{
					var pathDef = areaDef.paths[toAreaKey];
					var distance = pathDef["distance"];

					var toArea = areas[toAreaKey];

					if( toArea == null )
					{
						throw "Error when creating path for area \"" + fromAreaKey + "\": Could not find area \"" + toAreaKey + "\"";
					}

					try
					{
						// Join the Areas together
						var data = areaRelationshipSystem.createRelationship( fromArea, toArea );
						data.distance = distance;
					}
					catch( e )
					{
						// TODO: Remove try catch after implementing new format
						// Ignore, old format might throw exception
					}
				}
			}
		};
		this.loadAreaData = loadAreaData;

		this.buildAreaService = function( areaRelationshipSystem, areaData )
		{
			var areaService = {};

			areaService.areas = {};
			areaService.areaRelationshipSystem = areaRelationshipSystem;

			// Load areas and areaRelationshipSystem
			loadAreaData(areaService, areaData);

			areaService.toJson = function()
			{
				var jsonObject = {};
				jsonObject.areas = areaService.areas;

				// Serialize data in areaRelationshipSystem
				var allRelationships = areaService.areaRelationshipSystem.getAllRelationships();
				var paths = _.map( allRelationships, function( relationship )
				{
					var result = { areas: relationship.nodes, distance: relationship.data.distance };
					return result;
				});
				jsonObject.paths = paths;

				return jsonObject;
			};

			return areaService;
		};
	});
}());
