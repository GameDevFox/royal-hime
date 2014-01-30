
var object = function( obj ) 
{
	function F() {};
	F.prototype = obj;
	return new F();
};

// Function for of a set operation
function set( parent, name, child )
{
	parent[name] = child;
	return parent;
}

// Execute func for each object in iterale and store result in array to be returned
// TODO: If iterating over an array, will return an array with mismatched indexes
var each = function( iterable, func )
{
	// TODO: [prince] This should be handled by a "Type" system
	var isObject = typeof iterable == "object";
	
	var results = isObject ? {} : [];
	// END
	
	for( var i in iterable )
	{
		var value = iterable[i];
		var result = func.call( this, value, i );
		results[i] = result;
	}
	
	return results;
};

// Returns true only if ALL objects return true when run through the "is" function
var all = function( iterable, isFunction )
{
	var result = true;
	
	// TOOD: [prince] Optimize this to fail early
	each( iterable, function( value, index )
	{
		if( isFunction.apply( this, arguments ) == false )
		{
			result = false;
		}
	});
	
	return result;
};

// Return a subset of all elements that match a function
var find = function( iterable, findFunction )
{
	var results = [];
	
	each( iterable, function( value, index ) 
	{
		if( findFunction.apply( this, arguments ) == true )
		{
			results.push( value );
		}
	});
	
	return results;
};

// TODO: Deprecated
assert = function( condition, message )
{
	if( !condition )
	{
		throw message || "Assertion failed";
	}
};

// TODO: Deprecated
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
