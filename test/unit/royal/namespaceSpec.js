describe( "namespace", function() 
{
	beforeEach( function() 
	{
		namespace.namespace( "a.path.that.exists", function() 
		{
			// Empty
		});
	});
	
	afterEach( function() 
	{
		// Clean up namespace
		// TODO: [prince] Create a way to clear namespace
	});
	
	describe( "namespace()", function()
	{
		it( "registers a function with a given path", function() 
		{
			var myName = "Edward";
			namespace.namespace( "a.test.path", function() 
			{
				this.name = myName;
			});
			
			var node = namespace.getNode( "a.test.path" );
			expect( node.name ).toBe( myName );
		});
	});
	
	describe( "getNode()", function()
	{
		it( "gets a path based upon a namespace string", function() 
		{
			var node = namespace.getNode( "a.path.that.exists" );
			expect( node ).toEqual( {} );
		});
		
		it( "returns \"undefined\" if the path doesn't exist", function() 
		{
			var node = namespace.getNode( "a.path.that.doesnt.exist" );
			expect( node ).toBe( undefined );
		});
	});
	
	describe( "parsePath()", function()
	{
		it( "converts a string to a path array", function() 
		{
			var path = namespace.parsePath( "a.test.path" );
			
			expect( path ).toEqual( [ "a", "test", "path" ] );
		});
	});
});