var expect = require("chai").expect;

var dataPoint = require("royal/data-point");

describe("royal/data-point", function()
{
        describe("buildPoint(model)", function()
        {
                it("returns a point with a \"get()\" and \"set()\" function that access \"model\"", function()
                {
                        var x = 10;
                        var point = dataPoint.buildPoint(x);

                        expect(point.get()).to.equal(10);
                        point.set(13);
                        expect(point.get()).to.equal(13);
                        expect(x).to.equal(10);
                });
        });

        var point;
        beforeEach(function()
        {
                point = dataPoint.buildPoint(10);
        });

        describe("bindBeforeSet(point, func)", function()
        {
                it("bind a function to be called before a point's operation", function()
                {
                        var oldValue = null;
                        var valueArg = null;
                        dataPoint.bindBeforeSet(point, function(value)
                        {
                                oldValue = this.get();
                                valueArg = value;
                                return value + 5;
                        });

                        expect(oldValue).to.equal(null);
                        expect(valueArg).to.equal(null);
                        expect(point.get()).to.equal(10);

                        point.set(13);

                        expect(oldValue).to.equal(10);
                        expect(valueArg).to.equal(13);
                        expect(point.get()).to.equal(18);
                });
        });

        describe("bindAfterSet(point, func)", function()
        {
                it("bind a function to be called after a point's operation", function()
                {
                        var newValue = null;
                        var valueArg = null;
                        dataPoint.bindAfterSet(point, function(value)
                        {
                                newValue = this.get();
                                valueArg = value;
                                return value;
                        });

                        expect(newValue).to.equal(null);
                        expect(valueArg).to.equal(null);
                        expect(point.get()).to.equal(10);

                        point.set(13);

                        expect(newValue).to.equal(13);
                        expect(valueArg).to.equal(13);
                        expect(point.get()).to.equal(13);
                });
        });

        describe("attachOnSet(point)", function()
        {
                it("attaches \"onSet\" and \"offSet\" method to the point that trigger functions after set", function()
                {
                        dataPoint.attachOnSet(point);

                        var x = null;
                        var myFunc = function(value)
                        {
                                x = value;
                        };

                        point.set(1);
                        expect(x).to.equal(null);

                        point.onSet(myFunc);
                        point.set(2);
                        expect(x).to.equal(2);

                        point.offSet(myFunc);
                        point.set(3);
                        expect(x).to.equal(2);
                });
        });

        describe("buildExprPoint(func, args...)", function()
        {
                it("creates a readonly point that is set when it's dependencies (args) are modified via their \"set\" opertaions", function()
                {
                        var num = dataPoint.buildPoint(13);
                        var str = dataPoint.buildPoint("Hello World");
                        var bool = dataPoint.buildPoint(true);

                        dataPoint.attachOnSet(num);
                        dataPoint.attachOnSet(str);
                        dataPoint.attachOnSet(bool);

                        var myExpr = function(num, str, bool)
                        {
                                return bool.get() ?
                                        num.get() + str.get().length :
                                        str.get() + ":" + num.get();
                        }

                        var exprPoint = dataPoint.buildExprPoint(myExpr, num, str, bool);
                        expect(exprPoint.get()).to.equal(24);

                        bool.set(false);
                        expect(exprPoint.get()).to.equal("Hello World:13");

                        str.set("Goodbye Moon");
                        expect(exprPoint.get()).to.equal("Goodbye Moon:13");

                        num.set(100);
                        expect(exprPoint.get()).to.equal("Goodbye Moon:100");
                });
        });
});
