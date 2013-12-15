namespace.namespace( "com.everempire.hime", function() {
	
	var area = namespace.getNode( "com.everempire.hime.area" );
	
	var hime = this;
	
	this.Hime = function( gameClock, activityService )
	{
		this.gameClock = gameClock;
		this.activityService = activityService;
		
		// DI Areas
		this.areas = {};
		this.currentArea = null;
	};
	
	this.Hime.prototype.boost = function()
	{
		// TODO: [prince] Refactor
		var activityFrame = this.activityService.getNextCompletedActivity();
		this.gameClock.MotionClock.move( activityFrame.endTime - this.activityService.time, 1500 );
	};
	
	this.Hime.prototype.selectActor = function( actor )
	{
		this.selectedActor = actor;
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