namespace.namespace( "com.everempire.hime", function() {
	
	var math = namespace.getNode( "com.everempire.royal.math" );
	var time = namespace.getNode( "com.everempire.royal.time" );

	var actor = namespace.getNode( "com.everempire.hime.actor" );
	var area = namespace.getNode( "com.everempire.hime.area" );
	
	var hime = this;
	
	this.Hime = function( areaData )
	{
		initGameClock( this );
		initActors( this );
		
		this.areas = {};
		this.currentArea = null;
	};
	
	this.Hime.prototype.getProgress = function()
	{
		if( this.selectedActor.activityId == null )
		{
			return null;
		}

		// TODO: [prince] Should not have any reference to "window"
		return window.activityService.getProgress( this.selectedActor.activityId );
	};
	
	this.Hime.prototype.boost = function()
	{
		// TODO: [prince] Should not have any reference to "window"
		var activityFrame = window.activityService.getNextCompletedActivity();
		this.gameClock.MotionClock.move( activityFrame.endTime - window.activityService.time, 1500 );
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
	
	var initGameClock = function( hime )
	{
		// Build game clock
		var gameClock = time.buildFullClock();
		//gameClock.SpeedClock.setSpeed( 1 );
		//gameClock.PlusClock.setPlusTime( 1000000 );
		//gameClock.DeltaClock.clear();
		gameClock.MotionClock.setFilter( math.filters.easeInCubic );
		
		hime.gameClock = gameClock;
	};
	
	var initActors = function( himeGame )
	{
		// Init Actors
		var james = actor.buildActor( "James", 120 );
		var hime = actor.buildActor( "Hime", 80 );
		
		himeGame.actors = [
			james,
			hime
		];
		
		himeGame.selectedActor = james;
	};
});