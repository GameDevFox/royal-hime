var object = function( obj ) 
{
	function F() {};
	F.prototype = obj;
	return new F();
};

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

var validateEach = function( iterable, validationFunction )
{
	var result = true;
	
	// TOOD: [prince] Optimize this to fail early
	each( iterable, function()
	{
		if( validationFunction.apply( this, arguments ) == false )
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
