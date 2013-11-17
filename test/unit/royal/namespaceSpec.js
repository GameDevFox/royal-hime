describe( "namespace", function() 
{
	beforeEach( function() 
	{
		namespace.namespace( "a.path.that.exists", function() 
		{
			// Empty
		});
		
		namespace.namespace( "a.path.that.ends.with.a", function() 
		{
			this.string = "The end of the path";
		});
	});
	
	afterEach( function() 
	{
		// Clean up namespace
		// TODO: [prince] Create a way to clear namespace
	});
	
	describe( "namespace()", function()
	{
		it( "calls a function within the scope of the given path", function() 
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
	
	describe( "requireNode()", function()
	{
		it( "gets a path based upon a namespace string", function() 
		{
			var path = namespace.requireNode( "a.path.that.doesnt.exist.yet.but.it.will" )
			expect( path ).toEqual( {} );
		});
		
		it( "creates a path if it doesn't exist", 
		function() 
		{
			var node = namespace.requireNode( "a.path.that.doesnt.exist.yet.but.it.will" );
			expect( node ).toEqual( {} );
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