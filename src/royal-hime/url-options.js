var url = require("url");

module.exports = function(urlStr)
{
	var queryData = url.parse(urlStr, true).query;

	var options = {
		debug: false,
		dataPath: "data/"
	};

	var debugValue = queryData.debug;
	if(debugValue != null)
	{
		debugValue = debugValue.trim().toLowerCase();
		switch(debugValue)
		{
			case "true":
				options.debug = true;
				// What's up? World 2
				break;
			case "false":
				break;
			default:
				throw new Error('Expecting either "true" or "false" for [debug]. Invalid value: ' + queryData.debug.trim());
		}
	}

	var dataPathValue = queryData.dataPath;
	if(dataPathValue != null)
	{
		dataPathValue = dataPathValue.trim();
		if(dataPathValue.charAt(dataPathValue.length-1) != "/")
		{
			dataPathValue = dataPathValue + "/";
		}

		options.dataPath = dataPathValue;
	}

	return options;
};