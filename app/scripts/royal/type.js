(function() 
{
	namespace.namespace( "com.everempire.royal.type", function() 
	{
		// Native types
		this.isUndefined = function( value )
		{
			return typeof( value ) == "undefined";
		};
		
		this.isNull = function( value )
		{
			return !this.isUndefined( value ) && value == null;
		};
		
		this.isBoolean = function( value )
		{
			return typeof( value ) == "boolean";
		};
		
		this.isNumber = function( value )
		{
			return typeof( value ) == "number";
		};
		
		this.isString = function( value )
		{
			return typeof( value ) == "string";
		};
		
		this.isFunction = function( value )
		{
			return typeof( value ) == "function";
		};
		
		this.isArray = function ( value ) 
		{
			return Object.prototype.toString.apply( value ) == "[object Array]";
		};
		
		this.isObject = function( value )
		{
			return !this.isNull( value ) && ( typeof( value ) == "object" );
		};

		// Native Type Categories
		this.isEmpty = function( value )
		{
			return (
				this.isUndefined( value )
				|| this.isNull( value )
			);
		};
		
		// TODO: [prince] These aren't needed right now and have no tests
		// Uncomment later
		/*
		this.isNumeric = function( value )
		{
			return (
				this.isBoolean( value )
				|| this.isNumber( value )
			);
		};
		
		this.isContant = function( value )
		{
			return (
				this.isBoolean( value )
				|| this.isNumber( value )
				|| this.isString( value )
			);
		};
		
		this.isComplex = function( value )
		{
			return (
				this.isFunction( value )
				|| this.isObject( value )
			);
		};
		*/
		
		this.getType = function( value )
		{
			var type;
			
			if( this.isNull( value ) )
			{
				type = "null";
			}
			else
			{
				type = typeof( value );
			}
			
			return type;
		};
	});
}());