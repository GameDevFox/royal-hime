describe( "advanced", function()
{
	var advanced = namespace.getPath( "com.everempire.royal.advanced" );
	
	describe( "enhance()", function()
	{
		
		it( "makes an object \"advanced\"", function()
		{
			
		});
		
		it( "adds \"advancedToken\" object to object for meta-data storage", function()
		{
			var advancedToken = advanced.getToken();
			var simpleObject = { name: "Henry" };
			
			advanced.enhance( simpleObject );
			expect( simpleObject[advancedToken] ).toEqual( {} );
		});
				
		it( "throws exception when called on an already advanced object", function()
		{
			
		});
	});
});