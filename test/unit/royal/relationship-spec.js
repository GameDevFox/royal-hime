describe( "com.everempire.royal.relationship", function()
{
	var $relationship = namespace.getNode( "com.everempire.royal.relationship" );

	describe( "buildRelationshipSystem()", function()
	{
		it( "creates a relationship system", function()
		{
			var relationshipSystem = $relationship.buildRelationshipSystem();
			expect( relationshipSystem ).not.toEqual( null );
		});

		describe("RelationshipSystem", function()
		{
			var relationshipSystem;

			var nodeA = { name: "nodeA" };
			var nodeB = { name: "nodeB" };
			var nodeC = { name: "nodeC" };
			var nodeD = { name: "nodeD" };
			var nodeE = { name: "nodeE" };

			beforeEach( function()
			{
				relationshipSystem = $relationship.buildRelationshipSystem();
			});

			describe("createRelationship( nodeA, nodeB )", function()
			{
				var data;

				beforeEach( function()
				{
					data = relationshipSystem.createRelationship( nodeA, nodeB );
				});

				it("returns a relationship data object", function()
				{
					expect(data).toEqual({});
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
					var createRelationshipFunc = function()
					{
						relationshipSystem.createRelationship( nodeB, nodeA );
					};

					expect( createRelationshipFunc )
						.toThrow( {
							msg: "There is already a relationship between these two nodes",
							nodeA: nodeB,
							nodeB: nodeA
						});
				});
			});

			describe("getRelationship(nodeA, nodeB)", function()
			{
				beforeEach( function()
				{
					data = relationshipSystem.createRelationship( nodeA, nodeB );
					data.name = "MyData";
				});

				it("returns the data object indexed by these two nodes", function()
				{
					var data = relationshipSystem.getRelationship( nodeA, nodeB );
					expect(data).toEqual({ name: "MyData" });
				});

				it("is associative (order doesn't matter)", function()
				{
					var data = relationshipSystem.getRelationship( nodeB, nodeA );
					expect(data).toEqual({ name: "MyData" });
				});

				it("returns null if relationship doesn't exist", function()
				{
					var data = relationshipSystem.getRelationship( nodeA, nodeC );
					expect(data).toEqual(null);
				});
			});

			describe("getAllNodes()", function()
			{
				it("returns an array containing all nodes in this system", function()
				{
					relationshipSystem.createRelationship(nodeA, nodeB);
					relationshipSystem.createRelationship(nodeD, nodeA);
					
					var nodes = relationshipSystem.getAllNodes();
					expect(nodes).toEqual([nodeA,nodeB,nodeD]);
				});
			});

			describe("getAllRelationships()", function()
			{
				it("returns an array of all the realtionships in this system", function()
				{
					var dataAtoB = relationshipSystem.createRelationship(nodeA, nodeB);
					dataAtoB.name = "dataAtoB";
					var dataDtoA = relationshipSystem.createRelationship(nodeD, nodeA);
					dataDtoA.name = "dataDtoA";
					
					var nodes = relationshipSystem.getAllRelationships();
					expect(nodes).toEqual([
					                       { nodes: [nodeA, nodeB], data: { name: "dataAtoB" } },
					                       { nodes: [nodeD, nodeA], data: { name: "dataDtoA" } }
					]);
				});
			});

			describe("removeRelationship( nodeA, nodeB )", function()
			{
				it("removes a relationship between two nodes", function()
				{
					relationshipSystem.createRelationship( nodeA, nodeB );
					relationshipSystem.createRelationship( nodeA, nodeC );

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
					relationshipSystem.createRelationship( nodeA, nodeB );
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

					relationshipSystem.createRelationship( nodeA, nodeB );
					relationshipSystem.createRelationship( nodeB, nodeD );
					relationshipSystem.createRelationship( nodeB, nodeC );
					relationshipSystem.createRelationship( nodeD, nodeA );

					var relatedNodes = relationshipSystem.getRelatedNodes( nodeA );

					expect( _.difference( expectedRelations, relatedNodes ) ).toEqual( [] );
				});
			});

			describe("getRelatedNode( node )", function()
			{
				beforeEach(function()
				{
					relationshipSystem.createRelationship( nodeA, nodeB );
					relationshipSystem.createRelationship( nodeC, nodeD );
				});

				it("returns a the first (and presumably only) node that is related to the given node", function()
				{
					var relatedNode = relationshipSystem.getRelatedNode( nodeB );

					expect( relatedNode ).toEqual( nodeA );
				});

				it("returns null is there is no related node", function()
				{
					var relatedNode = relationshipSystem.getRelatedNode( nodeE );

					expect( relatedNode ).toEqual( null );
				});
			});
		});
	});
});
