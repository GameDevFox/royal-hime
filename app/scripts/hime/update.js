(function()
{
	namespace.namespace( "com.everempire.hime.update", function()
	{
		this.buildUpdateService = function($interval, gameClock, fps)
		{
			var updateService = {};

			var updateFunctions = [];
			var promise;

			var runUpdateFunctions = function()
			{
				_.each(updateFunctions, function(func)
				{
					gameClock.lap();
					func.call(this, gameClock);
				});
			};

			updateService.start = function()
			{
				promise = $interval(runUpdateFunctions, 1000 / fps, false);
			};

			updateService.stop = function()
			{
				$interval.cancel(promise);
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

				updateFunctions = updateFunctions.splice(index, 1);
			};

			updateService.start();

			return updateService;
		};
	});
}());