_.mixin(
{
	mapByName: function(collection, keyIterator, valueIterator, context)
	{
		var results = {};

		var func = function(value, key, collection)
		{
			var name = keyIterator(value, key, collection);
			results[name] = valueIterator(value, key, collection);
		};
		_.each(collection, func, context);

		return results;
	},

	zipObjects: function(keys)
	{
		var values = _.rest(arguments);
		var result = _.map(values, _.partial(_.zipObject, keys));
		return result;
	}
});
