namespace.namespace( "com.everempire.hime", function() {
	
	var area = namespace.getNode( "com.everempire.hime.area" );
	
	var hime = this;
	
	this.Hime = function( gameClock )
	{
		this.gameClock = gameClock;
		
		// DI Areas
		this.areas = {};
		this.currentArea = null;
	};
	
	this.Hime.prototype.loadAreaData = function( areaData )
	{
		// Load Area Data
		this.areas = area.loadAreas( areaData );
		
		for( var i in this.actors )
		{
			var actor = this.actors[i];
			actor.parentAreaId = "mainHall";
		}
	};
});