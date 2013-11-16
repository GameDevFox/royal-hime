(function() 
{
	var namespace = {};
	
	// Executes function on given path
	namespace.namespace = function( namespacePathStr, func )
	{
		var namespacePath = this.requirePath( namespacePathStr );
		func.call( namespacePath );
	};
	
	// Returns the object at the end of the path. Returns "undefined" if
	// the path doesn't exist
	namespace.getPath = function( path )
	{		
		var path = this.parsePath( path );
		
		// Travel the path, returning undefined if a node doens't exist
		var node = this.travelPath( window, path, false );
		return node;
	};
	
	// Same as "getPath()" but creates nodes that don't exist
	namespace.requirePath = function( path ) 
	{
		var path = this.parsePath( path );
		
		// Travel the path, creating nodes that don't exist
		var node = this.travelPath( window, path, true );
		return node;
	};
	
	namespace.parsePath = function( path )
	{
		if( typeof path == "string" )
		{
			path = path.split( "." );
		}
		
		return path;
	};
	
	namespace.travelPath = function( root, path, force )
	{
		var node = root;
		if( node == undefined )
		{
			node = window;
		}
		
		for( var index in path )
		{
			var part = path[index];
			
			if(node[part] == undefined) 
			{
				if( !force )
				{
					return undefined;
				}
				
				if( typeof node != "object" )
				{
					throw { name: "PathCollision" };
				}
				else
				{
					node[part] = {};
				}
			}
			
			// Move down the path
			node = node[part];
		}
		
		return node;
	};
	
	// Export to global scope
	window.namespace = namespace;
}());

