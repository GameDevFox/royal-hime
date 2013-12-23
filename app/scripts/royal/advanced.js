(function() 
{
	var advancedToken = "$a";

	namespace.namespace( "com.everempire.royal.advanced", function() 
	{
		// Type functions
		var type = namespace.getNode( "com.everempire.royal.type" );
		
		// Prototype, `object` MUST be an object
		this.enhance = function( object )
		{
			// Assumption: `object` is a simple object
			if( !type.isObject( object ) || !this.isSimple( object ) )
			{
				throw "\"object\" must be a simple object";
			}
			
			// `value` cannot be undefined since the object wadvancedTokenanced()` condition
			if( type.isUndefined( object ) )
			{
				value = null;
			}
			
			object[ advancedToken ] = {};
			
			return object;
		};
		
		this.getToken = function()
		{
			return advancedToken;
		};
		
		this.setNode = function( object, nodeName, value )
		{
			if( this.isSimple( object ) )
			{
				enhance( object );
			}
			
			object[advancedToken][nodeName] = value;
			return object;
		};
		
		this.getNode = function( object, nodeName )
		{
			if( this.isSimple( object ) )
			{
				return null;
			}
			
			return object[advancedToken][nodeName];
		};
		
		this.requireNode = function( object, nodeName, defaultNode )
		{
			if( this.isSimple( object ) )
			{
				this.enhance( object );
			}
			
			var node = this.getNode( object, nodeName );
			
			// If node doesn't exist, create the new node
			if( node == null )
			{
				this.setNode( object, nodeName, defaultNode );
				node = this.getNode( object, nodeName );
			}
			
			return node;
		};
		
		this.isSimple = function( value )
		{
			return !this.isAdvanced( value );
		};

		this.isAdvanced = function( value )
		{
			return (
				type.isObject( value )
				&& !type.isUndefined( value[ advancedToken ] )
			);
		};

		// TODO: [enicholes] Move this to System
		this.isSystem = function( value )
		{
			return (
				this.isAdvanced( value )
				|| value[ advancedObjectToken ][ systemToken ]
			);
		};
	});
}());