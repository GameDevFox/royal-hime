describe( "advanced", function()
{
	var advanced = namespace.getPath( "com.everempire.royal.advanced" );
	
	var simpleObject;
	
	beforeEach( function() 
	{
		simpleObject = { name: "simple" };
	});
	
	describe( "enhance()", function()
	{
		it( "makes an object \"advanced\"", function()
		{
			advanced.enhance( simpleObject );
			
			expect( advanced.isAdvanced( simpleObject ) ).toEqual( true );
		});
				
		it( "throws exception when called on an already advanced object", function()
		{
			advanced.enhance( simpleObject );
			
			expect( function() { advanced.enhance( simpleObject ); } ).toThrow();
		});
		
		it( "returns the now advanced object", function ()
		{
			var advancedObject = advanced.enhance( simpleObject );
			expect( advanced.isAdvanced( advancedObject ) ).toEqual( true );
		});
	});
	
	describe( "requireNode()", function() 
	{
		it( "enchaned the object to an advanced object if it is a simple object", function()
		{
			advanced.requireNode( simpleObject, "myNode", { name: "defaultNode" } )
			
			expect( advanced.getNode( simpleObject, "myNode" ) ).toEqual( { name: "defaultNode" } );
		});
		
		it( "creates a node on an advanched object if it doesn't exist", function()
		{
			advanced.enhance( simpleObject );
			advanced.requireNode( simpleObject, "myNode", { name: "defaultNode" } )
			
			expect( advanced.getNode( simpleObject, "myNode" ) ).toEqual( { name: "defaultNode" } );
		});
		
		it( "gets a node by name from an advanced object", function() 
		{
			advanced.enhance( simpleObject );
			advanced.setNode( simpleObject, "myNode", { name: "this is my node" } );
			
			expect( advanced.requireNode( simpleObject, "myNode", { name: "defaultNode" } ) )
				.toEqual( { name: "this is my node" } );
		});
	});
});