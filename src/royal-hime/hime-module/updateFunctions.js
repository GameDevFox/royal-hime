var updateFunctionFactory = {};

updateFunctionFactory.build = function(himeModule)
{
        var updateMeter = function(element, progress, message)
        {
                // Set Message
                $(element).find(".message").html(message);

                // Set Bar
                var bar = $(element).find(".bar");
                bar.html(message);

                var width = (progress * 100) + "%";
                bar.css("width", width);
        };

        himeModule.factory("updateFunctions", function($filter, actorService)
        {
                var timeFilter = $filter("time");
                var maxTime = 1000 * 60 * 60;

                var updateFunctions = {};

                updateFunctions.timeMeter = function(element, clock)
                {
                        var time = clock.getTime();
                        var progress = (time / maxTime) % 1;
                        var message = timeFilter(time);

                        updateMeter(element, progress, message);
                };

                updateFunctions.actorEnergyMeter = function(element, clock)
                {
                        var scope = element.scope();
                        var actor = scope.actor;

                        var progress = actor.energy / actor.maxEnergy;
                        var message = "En: " + (actor.energy).toFixed(1) + " / " + actor.maxEnergy;

                        updateMeter(element, progress, message);

                        var cssClass = "";
                        if(actor.energy >= actor.maxEnergy)
                        {
                                cssClass = "full";
                        }
                        else if(actor.energy <= actor.maxEnergy / 2 && actor.energy > actor.maxEnergy / 4)
                        {
                                cssClass = "half";
                        }
                        else if(actor.energy <= actor.maxEnergy / 4 && actor.energy > 0)
                        {
                                cssClass = "quarter";
                        }
                        else if(actor.energy <= 0)
                        {
                                cssClass = "empty";
                        }

                        element.attr("class", "energy-meter " + cssClass);
                };

                updateFunctions.actorProgressMeter = function(element, clock)
                {
                        var scope = element.scope();
                        var actor = scope.actor;

                        var progress = actorService.getActivityProgress(actor);
                        var remainingActivityTime = actorService.getRemainingActivityTime( actor );

                        var message;
                        if(progress == null)
                        {
                                // TODO: [prince] Factor this markup out somehow
                                message =
                                        '<div class="ready-message">' +
                                                'Ready' +
                                        '</div>';
                        }
                        else
                        {
                                // TODO: [prince] Factor this markup out somehow
                                message =
                                        '<div>' +
                                                'Progress: ' + (progress * 100).toFixed(0) + '%';

                                if(remainingActivityTime != null)
                                {
                                        message +=
                                                '<span ng:show="getRemainingActivityTime( actor )">' +
                                                        '( ' + timeFilter(remainingActivityTime) + ' )' +
                                                '</span>';
                                }

                                message += '</div>';
                        }

                        updateMeter(element, progress, message);
                };

                return updateFunctions;
        });
};

module.exports = updateFunctionFactory;
