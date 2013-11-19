describe( "area", function() 
{
	var area = namespace.getNode( "com.everempire.hime.area" );
	
	describe( "buildArea()", function() 
	{
		var roomName = "My Room";
		var myRoom;
		
		beforeEach( function() 
		{
			myRoom = area.buildArea( "My Room" );
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
	
	describe( "loadAreas( areaData )", function() 
	{
		it( "loads areas from a definition object", function() 
		{
			var areaDataJson = "{\"mainHall\":{\"name\":\"Main Hall\",\"paths\":" +
			"{\"diningRoom\":{\"distance\":50},\"masterBedroom\":{\"distance\"" +
			":100},\"servantsQuarters\":{\"distance\":120}}},\"diningRoom\":{" +
			"\"name\":\"Dining Room\",\"paths\":{\"mainHall\":{\"distance\":50}" +
			",\"kitchen\":{\"distance\":20}}},\"kitchen\":{\"name\":\"Kitchen\"," +
			"\"paths\":{\"diningRoom\":{\"distance\":20},\"corridor\":{\"distance\"" +
			":50},\"basement\":{\"distance\":20}}},\"corridor\":{\"name\":\"Corridor\"" +
			",\"paths\":{\"kitchen\":{\"distance\":50},\"servantsQuarters\":" +
			"{\"distance\":70}}},\"servantsQuarters\":{\"name\":\"Servant\'s Quarters\"" +
			",\"paths\":{\"corridor\":{\"distance\":70},\"mainHall\":{\"distance\":120}}}" +
			",\"masterBedroom\":{\"name\":\"Master Bedroom\",\"paths\":{\"mainHall\"" +
			":{\"distance\":100}}},\"basement\":{\"name\":\"Basement\",\"paths\":" +
			"{\"kitchen\":{\"distance\":20}}}}";
	
			var areaData = JSON.parse( areaDataJson );
			
			var areas = area.loadAreas( areaData );
			
			expect( areas ).not.toEqual( undefined );
		});
		
		it( "throws an exception if there is a a missing areaCode for a path", function() 
		{
			var areaDataJson = "{\"mainHall\":{\"name\":\"Main Hall\",\"paths\":" +
			"{\"diningRoom\":{\"distance\":50},\"masterBedroom\":{\"distance\"" +
			":100},\"servantsQuarters\":{\"distance\":120}}},\"diningRoom\":{" +
			"\"name\":\"Dining Room\",\"paths\":{\"mainHall\":{\"distance\":50}" +
			",\"kitchen\":{\"distance\":20}}},\"kitchen\":{\"name\":\"Kitchen\"," +
			"\"paths\":{\"diningRoom\":{\"distance\":20},\"corridor\":{\"distance\"" +
			":50},\"myBasement\":{\"distance\":20}}},\"corridor\":{\"name\":\"Corridor\"" +
			",\"paths\":{\"kitchen\":{\"distance\":50},\"servantsQuarters\":" +
			"{\"distance\":70}}},\"servantsQuarters\":{\"name\":\"Servant\'s Quarters\"" +
			",\"paths\":{\"corridor\":{\"distance\":70},\"mainHall\":{\"distance\":120}}}" +
			",\"masterBedroom\":{\"name\":\"Master Bedroom\",\"paths\":{\"mainHall\"" +
			":{\"distance\":100}}},\"basement\":{\"name\":\"Basement\",\"paths\":" +
			"{\"kitchen\":{\"distance\":20}}}}";
	
			var areaData = JSON.parse( areaDataJson );
			
			var loadAreasFunc = function() 
			{
				var areas = area.loadAreas( areaData );
			};
			
			expect( loadAreasFunc ).toThrow( 
				"Error when creating path for area 'kitchen': Could not find area 'myBasement'" 
			);
		});
	});
});
