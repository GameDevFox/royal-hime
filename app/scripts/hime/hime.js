namespace.namespace( "com.everempire.hime", function() {
	
	var math = namespace.getNode( "com.everempire.royal.math" );
	var time = namespace.getNode( "com.everempire.royal.time" );
	
	var activity = namespace.getNode("com.everempire.hime.activity");
	var actor = namespace.getNode( "com.everempire.hime.actor" );
	var area = namespace.getNode( "com.everempire.hime.area" );
	
	var hime = this;
	
	this.Hime = function( areaData )
	{
		initGameClock( this );
		initActors( this );
		
		this.areas = {};
		this.currentArea = null;
		
		this.activityService = activity.buildActivityService();
	};
	
	this.Hime.prototype.getProgress = function()
	{
		if( this.selectedActor.activityId == null )
		{
			return null;
		}

		// TODO: [prince] Use dependancy injection
		return this.activityService.getProgress( this.selectedActor.activityId );
	};
	
	this.Hime.prototype.getRemainingTime = function()
	{
		if( this.selectedActor.activityId == null )
		{
			return null;
		}

		// TODO: [prince] Use dependancy injection
		return this.activityService.getRemainingTime( this.selectedActor.activityId );
	};
	
	this.Hime.prototype.boost = function()
	{
		// TODO: [prince] Refactor
		var activityFrame = this.activityService.getNextCompletedActivity();
		this.gameClock.MotionClock.move( activityFrame.endTime - this.activityService.time, 1500 );
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