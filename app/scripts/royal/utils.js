object = function( obj ) 
{
	function F() {};
	F.prototype = obj;
	return new F();
};

each = function( iterable, func )
{
	var results = [];
	
	for( var i in iterable )
	{
		var object = iterable[i];
		var result = func.call( this, object );
		results[i] = result;
	}
	
	return results;
};

assert = function( condition, message )
{
	if( !condition )
	{
		throw message || "Assertion failed";
	}
};

firstIndexOf = function( parent, child )
{
	for( i in parent )
	{
		if( child === parent[i] )
		{
			return i;
		}
	}
	
	return null;
};
