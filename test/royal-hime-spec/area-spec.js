var expect = require("chai").expect;

var $area = require("../../src/royal-hime/area");
var $relationship = require("../../src/royal/relationship");

describe( "royal-hime/area", function()
{
	var areaData =
	{
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

	describe( "buildArea()", function()
	{
		it( "builds an area with a given name and key", function()
		{
			var myRoom = $area.buildArea( "My Room", "myRoom" );
			expect( myRoom ).to.deep.equal( { name: "My Room", key: "myRoom" } );
		});
	});

	describe("buildAreaService(areaRelationshipSystem, areaData)", function()
	{
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

		var invalidAreaData2 = {
			areas: {
				roomA: {
					name: "Room A", key: "roomA"
				},
				roomB: {
					name: "Room B", key: "roomB"
				}
			},
			paths: [
				{ areas: ["roomD", "roomA"], distance: 10 },
				{ areas: ["roomB", "roomC"], distance: 20 },
			]
		};

		it("builds an area service backed by the \"areaRealtionshipSystem\" and populated by \"areaData\"", function()
		{
			var areaRelationshipSystem = $relationship.buildRelationshipSystem();
			var areaService = $area.buildAreaService(areaRelationshipSystem, areaData);

			var areas = areaService.areas;
			expect(areas).to.deep.equal({
				roomA: { name: "Room A", key: "roomA" },
				roomB: { name: "Room B", key: "roomB" },
				roomC: { name: "Room C", key: "roomC" }
			});

			var roomA = areas.roomA;
			var roomB = areas.roomB;
			var roomC = areas.roomC;

			var allRelationships = areaService.areaRelationshipSystem.getAllRelationships();
			expect(allRelationships).to.deep.equal([
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
				.to.throw("Error when creating relationship from \"roomA\" to \"roomD\": Could not find area \"roomD\"");

			var buildAreaServiceFunc2 = function()
			{
				$area.buildAreaService(areaRelationshipSystem, invalidAreaData2);
			};

			expect(buildAreaServiceFunc2)
				.to.throw("Error when creating relationship from \"roomD\" to \"roomA\": Could not find area \"roomD\"");
		});
	});

	describe("areaService", function()
	{
		it("manages the creation and deletion of areas and their paths", function()
		{
			var areaRelationshipSystem = $relationship.buildRelationshipSystem();
			var areaService = $area.buildAreaService(areaRelationshipSystem);

			var areaA = areaService.createArea("Area A", "areaA");
			var areaB = areaService.createArea("Area B", "areaB");
			var areaC = areaService.createArea("Area C", "areaC");

			areaService.createPath(areaA.key, areaC.key, 123);
			areaService.createPath(areaB.key, areaC.key, 456);

			areaService.removeArea(areaB);

			var areaJson = areaService.toJson();
			expect(areaJson).to.deep.equal({
				areas : {
					areaA : { name : 'Area A', key : 'areaA' },
					areaC : { name : 'Area C', key : 'areaC' }
				},
				paths : [ { areas : [ 'areaA', 'areaC' ], distance : 123 } ]
			});
		});

		describe("toJson()", function()
		{
			it("returns an object that can be serialized to a JSON string", function()
			{
				var areaRelationshipSystem = $relationship.buildRelationshipSystem();
				var areaService = $area.buildAreaService(areaRelationshipSystem, areaData);

				var jsonObject = areaService.toJson();

				expect(jsonObject).to.deep.equal({
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
