var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode( "com.everempire.hime.actor" );
var $area = namespace.getNode( "com.everempire.hime.area" );

var buildServices = function( himeModule )
{
	himeModule.factory( "actorService", function( actorDefObject ) 
	{
		return $actor.buildActorService( actorDefObject );
	});

	himeModule.factory( "activityService", function( gameClock ) 
	{
		return $activity.buildActivityService( gameClock );
	});

	himeModule.factory( "areaService", function( areaDefObject )
	{
		return $area.buildAreaService( areaDefObject );
	});
};
