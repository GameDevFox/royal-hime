describe("com.everempire.royal.func", function()
{
	$func = namespace.getNode("com.everempire.royal.func");

	describe("getFuncName(func)", function()
	{
		it("returns the name of a function", function()
		{
			function myFunc(name, age)
			{
				return name+" is "+age+" years old";
			}

			var funcName = $func.getFuncName(myFunc);
			expect(funcName).toEqual("myFunc");

			var funcName2 = $func.getFuncName(Number);
			expect(funcName2).toEqual("Number");
		})
	});
});