describe( "namespace", function() 
{
	describe( "requirePath() method", function()
	{
		afterEach( function() 
		{
			// Clean up created paths
			delete window["this"];
		});
		
		it( "gets or creates a path based upon a namespace string", 
		function() 
		{
			var node = namespace.requirePath( "this.path.doesnt.exist.yet.but.it.will" );
			expect( node ).toEqual( {} );
		});
		
		it( "throws a \"PathCollision\" error when a non-object is already on the path", 
		function() 
		{
			var firstNode = namespace.requirePath( "this.path.ends.with.a" );
			firstNode.string = "This is the end of the path";
			
			expect( function() { 
				namespace.requirePath( "this.path.ends.with.a.string.i.think" ) 
			} ).toThrow( { name: "PathCollision" } );
		});
	});
	
	describe( "getPath() method", function()
	{
		afterEach( function() 
		{
			// Clean up created paths
			delete window["this"];
		});
		
		it( "gets a path based upon a namespace string", function() 
		{
			// Create path
			var testNode = namespace.requirePath( "this.is.a.test.path" );
			
			// GetPath
			var node = namespace.getPath( "this.is.a.test.path" );
			expect( node ).toBe( testNode );
		});
		
		it( "returns undefined if the path doesn't exist", function() 
		{
			// GetPath
			var node = namespace.getPath( "this.path.doesnt.exist" );
			expect( node ).toBe( undefined );
		});
	});
	
	describe( "namespace() method", function()
	{
		afterEach( function() 
		{
			// Clean up created paths
			delete window["this"];
		});
		
		it( "calls a function within the scope of the given path", function() 
		{
			var myName = "Edward";
			namespace.namespace( "this.is.a.test.namespace", function() 
			{
				this.name = myName;
			});
			
			var node = namespace.getPath( "this.is.a.test.namespace" );
			expect( node.name ).toBe( myName );
		});
	});
});