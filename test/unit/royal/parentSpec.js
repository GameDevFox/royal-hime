describe( "parent", function() 
{
	var parent = namespace.getPath( "com.everempire.royal.parent" );
	
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