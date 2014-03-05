_.mixin(
{
	mapEach: function(list, iterator, context)
	{
		var result = {};

		var func = function(element, index, list)
		{
			result[index] = iterator(element, index, list);
		};
		_.each(list, func, context);

		return result;
	}
});