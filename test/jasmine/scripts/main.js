require.config(
{
	paths:
	{
		angular: "lib/angular",
		jquery: "lib/jquery",
		lodash: "lib/lodash"
	},

	shim:
	{
		angular:
		{
			exports: "angular"
		}
	}
});