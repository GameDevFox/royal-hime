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
	});
}());