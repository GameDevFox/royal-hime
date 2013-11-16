describe( "namespace", function() 
{
	beforeEach( function() 
	{
		// Build test path manually
		window["a"] = {};
		window["a"]["path"] = {};
		window["a"]["path"]["that"] = {};
		var that = window["a"]["path"]["that"];
		
		that["exists"] = {};
		
		that["ends"] = {};
		that["ends"]["with"] = {};
		that["ends"]["with"]["a"] = {};
		that["ends"]["with"]["a"]["string"] = "The end of the path";
	});
	
	afterEach( function() 
	{
		// Clean up "window"
		delete window["a"];
	});
	
	describe( "requirePath()", function()
	{
		it( "gets a path based upon a namespace string", function() 
		{
			var path = namespace.requirePath( "a.path.that.doesnt.exist.yet.but.it.will" )
			expect( path ).toEqual( {} );
		});
		
		it( "creates a path if it doesn't exist", 
		function() 
		{
			var node = namespace.requirePath( "a.path.that.doesnt.exist.yet.but.it.will" );
			expect( node ).toEqual( {} );
		});
		
		it( "throws a \"PathCollision\" error when a non-object is already on the path", 
		function() 
		{
			var callRequirePath = function() { 
				namespace.requirePath( "a.path.that.ends.with.a.string.i.think" ) 
			}
			
			expect( callRequirePath ).toThrow( { name: "PathCollision" } );
		});
	});
	
	describe( "getPath()", function()
	{
		it( "gets a path based upon a namespace string", function() 
		{
			var node = namespace.getPath( "a.path.that.exists" );
			expect( node ).toEqual( {} );
		});
		
		it( "returns \"undefined\" if the path doesn't exist", function() 
		{
			var node = namespace.getPath( "a.path.that.doesnt.exist" );
			expect( node ).toBe( undefined );
		});
		
		it( "returns \"undefined\" when a non-object is already on the path", 
		function() 
		{
			var node = namespace.getPath( "a.path.that.ends.with.a.string.i.think" ) 
			expect( node ).toBe( undefined );
		});
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
			
			var node = namespace.getPath( "a.test.path" );
			expect( node.name ).toBe( myName );
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