describe( "parent", function() 
{
	var parent = namespace.getNode( "com.everempire.royal.parent" );

	var father;
	var mother;
	var child;
	
	beforeEach( function() 
	{
		father = { name: "Edward" };
		mother = { name: "Kelsey" };
		child = { name: "Henry" };
		
		parent.addChild( mother, child );
	});
	
	describe( "addChild( parent, child )", function() 
	{
		it( "sets the parent as the child's parent", function()
		{
			expect( parent.getParent( child ) ).toBe( mother );
		});
		
		it( "adds the child as one of the parent's children", function()
		{
			expect( parent.getChildren( mother ) ).toContain( child );
		});
		
		it( "removes the child from the old parent", function()
		{
			parent.addChild( father, child );
			
			expect( parent.getChildren( mother ) ).not.toContain( child );
		});
	});
	
	describe( "removeChild( parent, child )", function() 
	{
		beforeEach( function() 
		{			
			parent.removeChild( mother, child );
		});
		
		it( "sets the child's parent to null", function()
		{
			expect( parent.getParent( child ) ).toBe( null );
		});
		
		it( "removes the child from the parent's children", function()
		{
			expect( parent.getChildren( mother ) ).not.toContain( child );
		});
		
		it( "throws exception if the child is not one of the parent's children", function()
		{
			var removeChildFunc = function()
			{
				parent.removeChild( father, child );
			};
			
			expect( removeChildFunc ).toThrow();
		});
	});
});