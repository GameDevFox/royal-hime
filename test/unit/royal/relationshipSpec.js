describe( "com.everempire.royal.relationship", function()
{
	var $relationship = namespace.getNode( "com.everempire.royal.relationship" );

	describe( "createRelationshipSystem()", function()
	{
		it( "creates a relationship system", function()
		{
			var relationshipSystem = $relationship.createRelationshipSystem();
			expect( relationshipSystem ).not.toEqual( null );
		});
		
		describe("RelationshipSystem", function()
		{
			describe("addRelationship( nodeA, nodeB, relationshipData )", function()
			{
				it("creates a relationship node between two other nodes", function()
				{
					var relationshipSystem = $relationship.createRelationshipSystem();
					
					var nodeA = {};
					var nodeB = {};
					
					relationshipSystem.addRelationship( nodeA, nodeB );
					
					expect();
				});
			});
		});
	});
});
