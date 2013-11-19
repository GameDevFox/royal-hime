namespace.namespace( "com.everempire.hime.area", function() 
{
	this.buildArea = function( name ) {
		
		var area = {
			name: name,
			paths: {},
		};
		
		return area;
	};
	
	this.buildPath = function( area, distance )
	{
		var path = {
			area: area,
			distance: distance,
		};
		
		return path;
	};
	
	this.loadAreas = function( areaDefObj )
	{
		var areas = {};
		
		// Create Areas
		for( areaVarName in areaDefObj )
		{
			var areaDef = areaDefObj[areaVarName];
			
			var area = this.buildArea( areaDef.name );
			areas[ areaVarName ] = area;
		};
		
		// Bind Areas together via paths
		for( areaVarName in areaDefObj )
		{
			var areaDef = areaDefObj[areaVarName];
			
			var paths = areas[ areaVarName ].paths;
			
			for( areaCode in areaDef.paths )
			{
				var pathDef = areaDef.paths[areaCode];
				var distance = pathDef["distance"];
				
				var area = areas[areaCode];
				
				if( area == null )
				{
					throw "Error when creating path for area '" + areaVarName + "': Could not find area '" + areaCode + "'";
				}
				
				var path = this.buildPath( area, distance );
				
				paths[areaCode] = path;
			}
		}
		
		return areas;
	};
});
