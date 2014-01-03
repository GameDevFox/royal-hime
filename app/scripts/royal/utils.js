
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
var each = function( iterable, func )
{
	// TODO: [prince] This should be handled by a "Type" system
	var isObject = typeof iterable == "object";
	
	var results = isObject ? {} : [];
	// END
	
	for( var i in iterable )
	{
		var result = applyMember( func, i, iterable );
		results[i] = result;
	}
	
	return results;
};

var applyMember = function( func, index, iterable )
{
	var value = iterable[index];
	return func.call( this, value, index );
};

// Returns true only if ALL objects return true when run through the "is" function
var all = function( iterable, isFunction )
{
	var result = true;
	
	// TOOD: [prince] Optimize this to fail early
	each( iterable, function()
	{
		if( isFunction.apply( this, arguments ) == false )
		{
			result = false;
		}
	});
	
	return result;
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
