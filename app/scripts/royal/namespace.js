// Namespace Functions
function namespace( namespacePathStr, func )
{
	var namespacePath = getPath( namespacePathStr );
	func.call( namespacePath );
}

function getPath( pathStr ) 
{
	var path = window;
	
	var pathParts = pathStr.split(".");
	
	for(var index in pathParts)
	{
		var part = pathParts[index];
		
		if(path[part] == undefined) 
		{
			path[part] = {};
		}
		
		path = path[part];
	}
	
	if( path == window ) 
	{
		path = undefined;
	}
	
	return path;
}