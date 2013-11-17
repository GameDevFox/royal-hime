(function() 
{
	var nodeToken = "$node";
	var nodeFuncToken = "$nodeFunc";
	
	var nodeTree = {};
	
	var namespace = {};
	
	// Executes function on given path
	namespace.namespace = function( namespacePath, func )
	{
		var namespaceNode = this.requireNode( namespacePath, nodeTree );
		namespaceNode[nodeFuncToken] = func;
	};
	
	// Returns the object at the end of the path. Returns "undefined" if
	// the path doesn't exist
	namespace.getNode = function( path, rootNode )
	{		
		path = this.parsePath( path );
		rootNode = this.selectRootNode( rootNode );
		
		// Travel the path, returning undefined if a node doens't exist
		var pathNode = this.travelPath( rootNode, path, false );
		
		if( pathNode == undefined )
		{
			return undefined
		}
		
		// Check for node
		var node = pathNode[nodeToken];

		// If there is no node, but there is a nodeFunction, execute it to populate node
		if( node == undefined )
		{
			var nodeFunc = pathNode[nodeFuncToken];
			if( nodeFunc != undefined )
			{
				pathNode[nodeToken] = {};
				
				var node = pathNode[nodeToken];
				nodeFunc.call( node );
			}
		}
		
		return node;
	};
	
	// Same as "getPath()" but creates nodes that don't exist
	namespace.requireNode = function( path, rootNode ) 
	{
		path = this.parsePath( path );
		rootNode = this.selectRootNode( rootNode );
		
		// Travel the path, creating nodes that don't exist
		var node = this.travelPath( rootNode, path, true );
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
	
	namespace.selectRootNode = function( rootNode )
	{
		if( rootNode == null )
		{
			rootNode = nodeTree;
		}
		
		return rootNode;
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

