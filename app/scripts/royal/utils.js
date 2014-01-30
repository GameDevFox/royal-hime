(function() 
{
	namespace.namespace( "com.everempire.royal.utils", function() 
	{
		var $utils = this;
		
		// Function for of a set operation
		$utils.set = function( parent, name, child )
		{
			parent[name] = child;
			return parent;
		}
		
		$utils.getType = function( arg )
		{
			var type = typeof arg;
			
			if( type == "object" )
			{
				if( arg == null )
				{
					type = "null";
				}
				else if( Object.prototype.toString.call( arg ) === '[object Array]' ) {
					type = "array";
				}
			}
			
			return type;
		};
		
		$utils.addElement = function( iterable, key, value )
		{
			var type = $utils.getType( iterable );
			
			if( type == "object" )
			{
				iterable[key] = value;
			}
			else if( type == "array" )
			{
				iterable.push( value );
			}
			else
			{
				throw "\"iterable\" must be either an object or an array";
			}
		};
		
		// Execute func for each object in iterale and store result in array to be returned
		// TODO: If iterating over an array, will return an array with mismatched indexes
		$utils.each = function( iterable, func )
		{
			// TODO: [prince] This should be handled by a "Type" system
			var isObject = $utils.getType(iterable ) == "object";
			
			var results = isObject ? {} : [];
			// END
			
			for( var i in iterable )
			{
				var value = iterable[i];
				var result = func.call( this, value, i );
				$utils.addElement(results, i, result);
			}
			
			return results;
		};
		
		// Returns true only if ALL objects return true when run through the "is" function
		$utils.all = function( iterable, isFunction )
		{
			var result = true;
			
			// TOOD: [prince] Optimize this to fail early
			$utils.each( iterable, function( value, index )
			{
				if( isFunction.apply( this, arguments ) == false )
				{
					result = false;
				}
			});
			
			return result;
		};
		
		// Return a subset of all elements that match a function
		$utils.find = function( iterable, findFunction )
		{
			var results = [];
			
			$utils.each( iterable, function( value, index ) 
			{
				if( findFunction.apply( this, arguments ) == true )
				{
					results.push( value );
				}
			});
			
			return results;
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
	});
}());