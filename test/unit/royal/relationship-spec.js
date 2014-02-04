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
			var relationshipSystem;
			
			var nodeA = { name: "nodeA" };
			var nodeB = { name: "nodeB" };
			var nodeC = { name: "nodeC" };
			var nodeD = { name: "nodeD" };
			
			beforeEach( function()
			{
				relationshipSystem = $relationship.createRelationshipSystem();
			});
			
			describe("addRelationship( nodeA, nodeB )", function()
			{
				beforeEach( function()
				{
					relationshipSystem.addRelationship( nodeA, nodeB );
				});
				
				it("creates a relationship between two nodes", function()
				{
					var relatedNodes = relationshipSystem.getRelatedNodes( nodeA );
					expect( relatedNodes ).toEqual( [ nodeB ] );
					
					relatedNodes = relationshipSystem.getRelatedNodes( nodeB );
					expect( relatedNodes ).toEqual( [ nodeA ] );
				});
				
				it("throws exception if a relation between the two nodes already exists", function()
				{
					var addRelationshipFunc = function() 
					{ 
						relationshipSystem.addRelationship( nodeB, nodeA ); 
					};
					
					expect( addRelationshipFunc )
						.toThrow( { 
							msg: "There is already a relationship between these two nodes", 
							nodeA: nodeB,
							nodeB: nodeA
						});
				});
			});
			
			describe("removeRelationship( nodeA, nodeB )", function()
			{
				it("removes a relationship between two nodes", function()
				{
					relationshipSystem.addRelationship( nodeA, nodeB );
					relationshipSystem.addRelationship( nodeA, nodeC );
					
					relationshipSystem.removeRelationship( nodeA, nodeB );
					
					var relatedNodes = relationshipSystem.getRelatedNodes( nodeA );
					
					expect( relatedNodes ).toEqual( [ nodeC ] );
				});
				
				it("throws exception if a relation between the two nodes does not exist", function()
				{
					var removeRelationshipFunc = function() 
					{ 
						relationshipSystem.removeRelationship( nodeB, nodeA ); 
					};
					
					expect( removeRelationshipFunc )
						.toThrow( { 
							msg: "There is no relationship between these two nodes", 
							nodeA: nodeB,
							nodeB: nodeA
						});
				});
			});
			
			describe("hasRelationship( nodeA, nodeB )", function()
			{
				beforeEach( function() 
				{
					relationshipSystem.addRelationship( nodeA, nodeB );
				});
				
				it("returns true if this system contains a relationship between the two nodes", function()
				{
					expect( relationshipSystem.hasRelationship( nodeA, nodeB ) ).toEqual( true );
				});
				
				it("returns false if this system does not contain a relationship between the two nodes", function()
				{
					expect( relationshipSystem.hasRelationship( nodeA, nodeC ) ).toEqual( false );
				});
			});
			
			describe("getRelatedNodes( node )", function()
			{
				it("returns a list of nodes that are related to the given node", function()
				{
					var expectedRelations = [ nodeB, nodeD ];
					
					relationshipSystem.addRelationship( nodeA, nodeB );
					relationshipSystem.addRelationship( nodeB, nodeD );
					relationshipSystem.addRelationship( nodeB, nodeC );
					relationshipSystem.addRelationship( nodeD, nodeA );
					
					var relatedNodes = relationshipSystem.getRelatedNodes( nodeA );
					
					expect( _.difference( expectedRelations, relatedNodes ) ).toEqual( [] );
				});
			});
		});
	});
});
