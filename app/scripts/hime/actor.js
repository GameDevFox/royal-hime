define( function() 
{
	var actor = {};
	
	actor.Actor = function( name ) 
	{
		this.name = name;
		this.energy = 100;
		this.activity = null;
	};
	
	actor.Actor.prototype =
	{
		isActive: function()
		{
			return this.activity != null;
		}
	};
	
	return actor;
});