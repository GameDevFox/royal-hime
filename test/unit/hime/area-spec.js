describe( "com.everempire.hime.area", function() 
{
	var $area = namespace.getNode( "com.everempire.hime.area" );
	
	var $relationship = namespace.getNode( "com.everempire.royal.relationship" );

	describe( "buildArea()", function() 
	{
		var roomName = "My Room";
		var myRoom;

		beforeEach( function() 
		{
			myRoom = $area.buildArea( "My Room" );
		});

		it( "builds an area", function() 
		{
			expect( myRoom ).not.toEqual( undefined );
		});

		it( "assigns it the given name", function() 
		{
			expect( myRoom.name ).toEqual( roomName );
		});
	});

	describe("buildAreaService( areaRelationshipSystem, areaData )", function()
	{
		var areaData = {
				roomA: { 
					name: "Room A", key: "roomA", 
					paths: { roomB: { distance: 10 } }
				},
				roomB: {
					name: "Room B", key: "roomB",
					paths: { roomC: { distance: 20 } }
				},
				roomC: {
					name: "Room C", key: "roomC",
					paths: { roomA: { distance: 30 } }
				}
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

		describe("areaService", function()
		{
			describe("toJson()", function()
			{
				it("returns an object that can be serialized to a JSON string", function()
				{
					var areaRelationshipSystem = $relationship.buildRelationshipSystem();
					var areaService = $area.buildAreaService(areaRelationshipSystem, areaData);

					var jsonObject = areaService.toJson();
					expect(jsonObject).toEqual({});
				});
			});
		});
	});
});
