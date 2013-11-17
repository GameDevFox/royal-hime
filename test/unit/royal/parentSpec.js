describe( "parent", function() 
{
	var parent = namespace.getNode( "com.everempire.royal.parent" );
	
	describe( "addChild()", function() 
	{
		it( "sets the parent as the child's parent", function()
		{
			var mother = { name: "Kelsey" };
			var child = { name: "Henry" };
			
			parent.addChild( mother, child );
			
			expect( parent.getParent( child ) ).toBe( mother );
		});
	});
});