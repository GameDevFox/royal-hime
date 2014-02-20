var $relationship = namespace.getNode("com.everempire.royal.relationship");

var $activity = namespace.getNode("com.everempire.hime.activity");
var $actor = namespace.getNode("com.everempire.hime.actor");
var $area = namespace.getNode("com.everempire.hime.area");
var $update = namespace.getNode("com.everempire.hime.update");

var buildServices = function(himeModule)
{
	himeModule.factory("areaRelationshipSystem", function()
	{
		return $relationship.buildRelationshipSystem();
	});

	himeModule.factory("actorAreaRelationshipSystem", function()
	{
		return $relationship.buildRelationshipSystem();
	});

	himeModule.factory("actorService", function(activityService, actorAreaRelationshipSystem, actorData)
	{
		return $actor.buildActorService(activityService, actorAreaRelationshipSystem, actorData);
	});

	himeModule.factory("activityService", function(gameClock, updateService)
	{
		var activityService = $activity.buildActivityService(gameClock);
		updateService.add(activityService.update);

		return activityService;
	});

	himeModule.factory("areaService", function(areaRelationshipSystem, areaData)
	{
		return $area.buildAreaService(areaRelationshipSystem, areaData);
	});

	himeModule.factory("updateService", function($interval, gameClock)
	{
		var updateService = $update.buildUpdateService($interval, gameClock);
		updateService.start();

		return updateService;
	});
};
