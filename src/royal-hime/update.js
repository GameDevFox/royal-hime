var update = {};

// TODO: Validate that clock has the "lap()" method
update.buildUpdateService = function($interval, clock, fps)
{
        var updateService = {};

        var updateFunctions = [];
        var promise;

        var runUpdateFunctions = function()
        {
                _.each(updateFunctions, function(func)
                {
                        clock.lap();
                        func.call(this, clock);
                });
        };

        updateService.start = function()
        {
                if(promise == null)
                {
                        promise = $interval(runUpdateFunctions, 1000 / fps, false);
                }
        };

        updateService.stop = function()
        {
                if(promise != null)
                {
                        $interval.cancel(promise);
                        promise = null;
                }
        };

        updateService.add = function(func)
        {
                if(updateFunctions.indexOf(func) != -1)
                {
                        throw "This function was already added to this service";
                }

                updateFunctions.push(func);
        };

        updateService.remove = function(func)
        {
                var index = updateFunctions.indexOf(func);
                if(index == -1)
                {
                        throw "This function was never added to this service";
                }

                updateFunctions.splice(index, 1);
        };

        updateService.isRunning = function()
        {
                return promise != null;
        };

        return updateService;
};

module.exports = update;