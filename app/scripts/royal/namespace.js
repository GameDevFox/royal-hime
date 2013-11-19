(function() 
{
	var nodeToken = "$node";
	var nodeFuncToken = "$nodeFunc";
	
	var nodeTree = {};
	
	var namespace = {};
	
	// Executes function on given path
	namespace.namespace = function( path, func )
	{
		var namespaceNode = this.travelPath( nodeTree, path, true );
		namespaceNode[nodeFuncToken] = func;
	};
	
	// Returns the object at the end of the path. Returns "undefined" if
	// the path doesn't exist
	namespace.getNode = function( path, rootNode )
	{		
		rootNode = this.evaluteRootNode( rootNode );
		
		// Travel the path, returning undefined if a node doesn't exist
		var pathNode = this.travelPath( rootNode, path, false );
		
		var node = this.evaluatePathNode( pathNode );
		
		return node;
	};
	
	namespace.evaluteRootNode = function( rootNode )
	{
		if( rootNode == null )
		{
			rootNode = nodeTree;
		}
		
		return rootNode;
	};
	
	namespace.evaluatePathNode = function( pathNode )
	{
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
	
	namespace.travelPath = function( root, path, force )
	{
		path = this.parsePath( path );
		
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
	
	namespace.parsePath = function( path )
	{
		if( typeof path == "string" )
		{
			path = path.split( "." );
		}
		
		return path;
	};
	
	// Export to global scope
	window.namespace = namespace;
}());

