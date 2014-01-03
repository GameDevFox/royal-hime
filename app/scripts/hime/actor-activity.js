namespace.namespace( "com.everempire.hime.actor.activity", function() 
{
	// Activity types
	// * Until Condition ( Walk until you reach destination, train until tired, mine until 100g )
	
	// Activity Events
	// * Complete
	// * Cancel
	
	var movementRate = 1.2; // meters per second
	var energyDepletionRate = 1; // units per second
	
	var move = function()
	{
		
	};
	
	this.hasActivity = function( actor )
	{
		actor.activity;
	};
});