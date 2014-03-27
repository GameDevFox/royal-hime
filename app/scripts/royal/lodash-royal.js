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
	}

	_.map([
	  [ "James", 21, 100 ],
	  [ "Erica", 18, 110 ],
	  [ "James", 24, 86 ],
	  [ "Melissa", 45, 72 ]
	],
	_.partial(_.zipObject, [ "name", "age", "score" ]));
});
