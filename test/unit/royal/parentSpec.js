describe( "parent", function() 
{
	var parent = namespace.getNode( "com.everempire.royal.parent" );
	
	describe( "addChild()", function() 
	{
		var mother;
		var child;
		
		beforeEach( function() 
		{
			mother = { name: "Kelsey" };
			child = { name: "Henry" };
			
			parent.addChild( mother, child );
		});
		
		it( "sets the parent as the child's parent", function()
		{
			expect( parent.getParent( child ) ).toBe( mother );
		});
		
		it( "adds the child as one of the parent's children", function()
		{
			expect( parent.getChildren( mother ) ).toContain( child );
		});
	});
});