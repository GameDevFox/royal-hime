(function() 
{
	// Bootstrap by defining our createPath method
	var requirePath = function( path, root ) 
	{
		// get the different sections of our path
		var pathParts = path.split(".");
		
		// Start trancing the path from the global scope
		var path = window;
		for( var index in pathParts )
		{
			var part = pathParts[index];
			
			// If path doesn't exist, create it
			if(path[part] == undefined) 
			{
				path[part] = {};
			}
			
			if( typeof path[part] != "object" )
			{
				throw { name: "PathCollision" };
			}
			
			// Move down the path
			path = path[part];
		}
		
		return path;
	};
	
	// Using the new method, we create a path to "namespace" ...
	var namespace = requirePath( "com.everempire.royal.namespace" );
	// ... and add the new function to it
	namespace.requirePath = requirePath;
	
	// We can now add the other functions that belong on namespace
	//////////////////////////////////////////////////////////////
	
	// TODO: [prince] find some way to refactor requirePath() and getPath()
	// to avoid code duplication
	
	// Same as requirePath() but returns 
	// undefined if the path doens't exist
	namespace.getPath = function( path )
	{		
		// get the different sections of our path
		var pathParts = path.split(".");
		
		// Start trancing the path from the global scope
		var path = window;
		for( var index in pathParts )
		{
			var part = pathParts[index];
			
			// If path doesn't exist, return undefined
			if(path[part] == undefined) 
			{
				return undefined;
			}
			
			// Move down the path
			path = path[part];
		}
		
		return path;
	}
	
	// TODO [prince] implement this properly, WRITE A TEST FOR IT FIRST
	// Adds function to 
	namespace.namespace = function( namespacePathStr, func )
	{
		var namespacePath = this.requirePath( namespacePathStr );
		func.call( namespacePath );
	};
	
	// Export to global scope
	window.namespace = namespace;
}());

