(function()
{
	namespace.namespace( "com.everempire.royal.func", function()
	{
		this.getFuncName = function(func)
		{
			var funcStr = func.toString();

			var spaceIdx = funcStr.indexOf(" ");
			var paranIdx = funcStr.indexOf("(")

			var funcName = funcStr.substring(spaceIdx+1, paranIdx);
			return funcName;
		};
	});
}());