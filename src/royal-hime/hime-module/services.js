var $update = require("royal-hime/update");
var $activity = require("royal-hime/activity");
var $relationship = require("royal/relationship");
var $actor = require("royal-hime/actor");
var $area = require("royal-hime/area");

var serviceFactory = {};

serviceFactory.build = function(himeModule)
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

        himeModule.provider("updateFunctions", function()
        {
                var updateFunctions = {};

                var provider =
                {
                        register: function(name, func)
                        {
                                updateFunctions[name] = func;
                        },

                        $get: function()
                        {
                                return updateFunctions;
                        }
                };

                return provider;
        });
};

module.exports = serviceFactory;
