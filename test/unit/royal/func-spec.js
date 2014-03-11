describe("com.everempire.royal.func", function()
{
	$func = namespace.getNode("com.everempire.royal.func");

	function myFunc(   name , age  ) // <-- Intentional white space
	{
		return name+" is "+age+" years old";
	}

	describe("getName(func)", function()
	{
		it("returns the name of a function", function()
		{
			var funcName = $func.getName(myFunc);
			expect(funcName).toEqual("myFunc");

			var funcName2 = $func.getName(Number);
			expect(funcName2).toEqual("Number");
		})
	});

	describe("getArgs(func)", function()
	{
		it("returns an array of arguments names for a function", function()
		{
			var args = $func.getArgs(myFunc);
			expect(args).toEqual(["name", "age"]);
		});
	});
});