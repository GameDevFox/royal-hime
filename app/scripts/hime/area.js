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
			areaService.areas = areaData.areas;

			//Load areaRelationshipSystem
			var areaRelationshipSystem = areaService.areaRelationshipSystem;

			var paths = areaData.paths;
			_.each(paths, function(path)
			{
				var areaKeys = path.areas;
				var distance = path.distance;

				var fromArea = areaService.areas[areaKeys[0]];
				var toArea = areaService.areas[areaKeys[1]];

				if(fromArea == null)
				{
					throw "Error when creating relationship from \"" + fromAreaKey + "\" to \"" + toAreaKey + "\": Could not find \"from\" area \"" + fromAreaKey + "\"";
				}
				else if(toArea == null)
				{
					throw "Error when creating relationship from \"" + fromAreaKey + "\" to \"" + toAreaKey + "\": Could not find \"to\" area \"" + toAreaKey + "\"";
				}

				// Join the Areas together
				var data = areaRelationshipSystem.createRelationship( fromArea, toArea );
				data.distance = distance;
			});
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
					var areaKeyArray = _.pluck(relationship.nodes, "key");
					var result = { areas: areaKeyArray, distance: relationship.data.distance };
					return result;
				});
				jsonObject.paths = paths;

				return jsonObject;
			};

			return areaService;
		};
	});
}());
