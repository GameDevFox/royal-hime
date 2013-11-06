var advancedToken = "$a";

namespace( "com.everempire.royal.advanced", function() 
{
	// Type functions
	var type = getPath( "com.everempire.royal.type" );
	
	// Prototype, `object` MUST be an object
	this.enhance = function( object )
	{
		// Assumption: `object` is a simple object
		assert( type.isObject( object ) && this.isSimple( object ), "'object' must be a simple object" );
		
		// `value` cannot be undefined since the object wadvancedTokenanced()` condition
		if( type.isUndefined( value ) )
		{
			value = null;
		}
		
		object[ advancedObjectToken ] = {};
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
		if( this.isSimple() )
		{
			return null;
		}
		
		return object[advancedToken][nodeName];
	};
	
	this.requireNode = function( object, nodeName, newNode )
	{
		if( this.isSimple() )
		{
			return null;
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
			this.native.isObject( value )
			&& !this.native.isUndefined( value[ advancedToken ] )
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