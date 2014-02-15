describe( "com.everempire.hime.area", function() 
{
	var $area = namespace.getNode( "com.everempire.hime.area" );
	
	var $relationship = namespace.getNode( "com.everempire.royal.relationship" );

	describe( "buildArea()", function() 
	{
		it( "builds an area with a given name and key", function()
		{
			var myRoom = $area.buildArea( "My Room", "myRoom" );
			expect( myRoom ).toEqual( { name: "My Room", key: "myRoom" } );
		});
	});

	describe("buildAreaService( areaRelationshipSystem, areaData )", function()
	{
		var areaData = {
			areas: {
				roomA: { 
					name: "Room A", key: "roomA"
				},
				roomB: {
					name: "Room B", key: "roomB"
				},
				roomC: {
					name: "Room C", key: "roomC"
				}
			},
			paths: [
				{ areas: ["roomA", "roomB"], distance: 10 },
				{ areas: ["roomB", "roomC"], distance: 20 },
				{ areas: ["roomC", "roomA"], distance: 30 }
			]
		};

		var invalidAreaData = {
			areas: {
				roomA: {
					name: "Room A", key: "roomA"
				},
				roomB: {
					name: "Room B", key: "roomB"
				}
			},
			paths: [
				{ areas: ["roomA", "roomD"], distance: 10 },
				{ areas: ["roomB", "roomC"], distance: 20 },
			]
		};

		it("builds an area service backed by the \"areaRealtionshipSystem\" and populated by \"areaData\"", function()
		{
			var areaRelationshipSystem = $relationship.buildRelationshipSystem();
			var areaService = $area.buildAreaService(areaRelationshipSystem, areaData);

			var areas = areaService.areas;
			expect(areas).toEqual({
				roomA: { name: "Room A", key: "roomA" },
				roomB: { name: "Room B", key: "roomB" },
				roomC: { name: "Room C", key: "roomC" }
			});

			var roomA = areas.roomA;
			var roomB = areas.roomB;
			var roomC = areas.roomC;

			var allRelationships = areaService.areaRelationshipSystem.getAllRelationships();
			expect(allRelationships).toEqual([
				{ nodes: [roomA, roomB], data: { distance: 10 } },
				{ nodes: [roomB, roomC], data: { distance: 20 } },
				{ nodes: [roomC, roomA], data: { distance: 30 } }
			]);
		});

		it("throws an exception if the provided data is invalid", function()
		{
			var areaRelationshipSystem = $relationship.buildRelationshipSystem();
			var buildAreaServiceFunc = function()
			{
				$area.buildAreaService(areaRelationshipSystem, invalidAreaData);
			};

			expect(buildAreaServiceFunc)
				.toThrow("Error when creating relationship from \"roomA\" to \"roomD\": Could not find area \"roomD\"");
		});

		describe("areaService", function()
		{
			describe("toJson()", function()
			{
				it("returns an object that can be serialized to a JSON string", function()
				{
					var areaRelationshipSystem = $relationship.buildRelationshipSystem();
					var areaService = $area.buildAreaService(areaRelationshipSystem, areaData);

					var jsonObject = areaService.toJson();

					expect(jsonObject).toEqual({
						areas: {
							roomA: { name: "Room A", key: "roomA" },
							roomB: { name: "Room B", key: "roomB" },
							roomC: { name: "Room C", key: "roomC" }
						},
						paths: [
							{ areas: ["roomA", "roomB"], distance: 10 },
							{ areas: ["roomB", "roomC"], distance: 20 },
							{ areas: ["roomC", "roomA"], distance: 30 }
						]
					});
				});
			});
		});
	});
});
