var expect = require("chai").expect;

var $func = require("royal/func");

describe("royal/func", function()
{
        function myFunc(   name , age  ) // <-- Intentional white space
        {
                return name+" is "+age+" years old";
        }

        describe("getName(func)", function()
        {
                it("returns the name of a function", function()
                {
                        var funcName = $func.getName(myFunc);
                        expect(funcName).to.equal("myFunc");

                        var funcName2 = $func.getName(Number);
                        expect(funcName2).to.equal("Number");
                });
        });

        describe("getArgs(func)", function()
        {
                it("returns an array of arguments names for a function", function()
                {
                        var args = $func.getArgs(myFunc);
                        expect(args).to.deep.equal(["name", "age"]);
                });
        });

        var player = { name: "Prince", age: 21 };

        describe("get(object, parameterName)", function()
        {
                it("gets the parameter of an object by name", function()
                {
                        var playerName = $func.get(player, "name");
                        expect(playerName).to.equal("Prince");
                });
        });

        describe("set(object, parameterName, value)", function()
        {
                it("sets the parameter of an object by name", function()
                {
                        $func.set(player, "age", 24);
                        expect(player.age).to.equal(24);
                });
        });
});
