//* addChild( child )
//* getChild( childId )
//* removeChild( child )
//* getChildren()
//* removeChildren()

//* getParent()
	// Returns current parent
//* setParent( parent )
	// Calls remove parent ( if not null ) and addChild( this ) on parent object
//* removeParent()
	// Calls removeChild( this ) on parent object

namespace.namespace( "com.everempire.royal.parent", function() 
{
	var advanced = namespace.getNode( "com.everempire.royal.advanced" );
	
	// TODO: [prince] This is essentialy a static variable
	// Make this namespace a service
	var childIdCounter = 0;
	
	// Init Funcitons
	this.requireParentParentNode = function( parent )
	{
		var parentNode = advanced.requireNode( parent, "parent", {
			children: []
		});
		
		return parentNode;
	};
	
	this.requireChildParentNode = function( child )
	{
		var parentNode = advanced.requireNode( child, "parent", {
			childId: childIdCounter++,
			parent: null
		});
		
		return parentNode;
	};
	
	// Parent Functions
	this.addChild = function( parent, child )
	{
		var parentParentNode = this.requireParentParentNode( parent );
		var childParentNode = this.requireChildParentNode( child );
		
		// Remove child from old parent, if one exists
		var oldParent = this.getParent( child );
		if( oldParent != null )
		{
			this.removeChild( oldParent, child );
		}
		
		// Add child to to new parent
		var childId = childParentNode.childId;
			// Add child to parent
			parentParentNode.children[childId] = child;
			// Add parent to child
			childParentNode.parent = parent;
	};
	
	this.removeChild = function( parent, child )
	{
		var parentParentNode = this.requireParentParentNode( parent );
		var childParentNode = this.requireChildParentNode( child );

		var childId = childParentNode.childId;
		
		// Make sure `parent` has `child` in `children`
		var hasChild = childId in parentParentNode.children;
		if( !hasChild )
		{
			throw "`parent` does not have `child` as one of it's children";
		}
		
		// Remove Child from Parent
		delete parentParentNode.children[childId];
		// Remove Parent from Child
		childParentNode.parent = null;
	};
	
	this.getChild = function( parent, childId )
	{
		var parentNode = advanced.getNode( parent, "parent" );
		if( parentNode == null )
		{
			return null;
		}
		
		return parentNode.children[childId];
	};
	
	this.getChildren = function( parent )
	{
		var parentNode = advanced.getNode( parent, "parent" );
		if( parentNode == null )
		{
			return [];
		}
		
		return parentNode.children;
	};
	
	this.removeChildren = function( parent )
	{
		var children = this.getChildren( parent );
		
		for( var i in children )
		{
			var child = children[i];
			this.removeChild( parent, child );
		};
	};
	
	// Child Functions
	this.getParent = function( child )
	{
		var parentNode = advanced.getNode( child, "parent" );
		if( parentNode == null )
		{
			return null;
		}
		
		return parentNode.parent;
	};
	
	this.setParent = function( child, parent )
	{
		if( parent == null )
		{
			this.removeParent( child );
		}
		else
		{
			this.addChild( parent, child );
		}
	};
	
	this.removeParent = function( child )
	{
		var parent = this.getParent( child );
		if( parent != null )
		{
			this.removeChild( parent, child );
		}
	};
});