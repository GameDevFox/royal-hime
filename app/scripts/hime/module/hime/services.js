var $relationship = namespace.getNode("com.everempire.royal.relationship");

var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode( "com.everempire.hime.actor" );
var $area = namespace.getNode( "com.everempire.hime.area" );

var buildServices = function( himeModule )
{
	himeModule.factory( "areaRelationshipSystem", function()
	{
		return $relationship.buildRelationshipSystem();
	});

	himeModule.factory( "actorService", function( actorData, activityService, areaService ) 
	{
		return $actor.buildActorService( actorData, activityService, areaService );
	});

	himeModule.factory( "activityService", function( gameClock ) 
	{
		return $activity.buildActivityService( gameClock );
	});

	himeModule.factory( "areaService", function( areaRelationshipSystem, areaData )
	{
		return $area.buildAreaService( areaRelationshipSystem, areaData );
	});
};
