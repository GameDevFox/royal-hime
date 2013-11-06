namespace( "com.everempire.hime.actor", function() {
	
	this.Actor = function( name ) 
	{
		this.name = name;
		this.energy = 100;
		this.activity = null;
	};
	
	this.Actor.prototype =
	{
		isActive: function()
		{
			return this.activity != null;
		}
	};
});