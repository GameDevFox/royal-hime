var $area = {};

$area.buildArea = function( name, key ) {

        var area = {
                name: name,
                key: key
        };

        return area;
};

$area.loadAreaData = function( areaService, areaData )
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

                var fromAreaKey = areaKeys[0];
                var toAreaKey = areaKeys[1];

                var fromArea = areaService.areas[fromAreaKey];
                var toArea = areaService.areas[toAreaKey];

                if(fromArea == null)
                {
                        throw "Error when creating relationship from \"" + fromAreaKey + "\" to \"" + toAreaKey + "\": Could not find area \"" + fromAreaKey + "\"";
                }
                else if(toArea == null)
                {
                        throw "Error when creating relationship from \"" + fromAreaKey + "\" to \"" + toAreaKey + "\": Could not find area \"" + toAreaKey + "\"";
                }

                // Join the Areas together
                var data = areaRelationshipSystem.createRelationship( fromArea, toArea );
                data.distance = distance;
        });
};

$area.buildAreaService = function( areaRelationshipSystem, areaData )
{
        var areaService = {};

        areaService.areas = {};
        areaService.areaRelationshipSystem = areaRelationshipSystem;

        // Load areas and areaRelationshipSystem
        if(areaData != null)
        {
                $area.loadAreaData(areaService, areaData);
        }

        areaService.createArea = function(areaName, areaKey)
        {
                var area = $area.buildArea(areaName, areaKey);
                areaService.areas[area.key] = area;

                return area;
        };

        areaService.removeArea = function(area)
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

        areaService.createPath = function(areaAKey, areaBKey, pathDistance)
        {
                var areaA = areaService.areas[areaAKey];
                var areaB = areaService.areas[areaBKey];

                var data = areaRelationshipSystem.createRelationship(areaA, areaB);
                data.distance = pathDistance;
        };

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

module.exports = $area;