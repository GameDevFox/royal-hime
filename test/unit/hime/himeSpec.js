describe( "hime", function() 
{
	var hime = namespace.getNode( "com.everempire.hime" );
	
	describe( "buildArm()", function() 
	{
		it( "builds an arm with a hand", function() 
		{
			var arm = hime.buildArm();
			
			expect( arm.hand ).not.toEqual( undefined );
		});
	});
});
