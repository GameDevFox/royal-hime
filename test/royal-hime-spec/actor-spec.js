var expect = require("chai").expect;

var $actor = require("../../src/royal-hime/actor");

describe( "royal-hime/actor", function()
{
	var myActor;

	beforeEach( function()
	{
		myActor = $actor.buildActor( "Prince" );
	});

	describe("buildActor()", function()
	{
		it("builds an actor with default maxEnergy of 100", function()
		{
			expect(myActor.maxEnergy).to.equal(100);
		});

		it("builds an actor with energy equals to maxEnergy", function()
		{
			expect(myActor.energy).to.equal(myActor.maxEnergy);
		});

		it("builds an actor with a specified amount of maxEnergy", function()
		{
			var maxEnergy = 123;
			myActor = $actor.buildActor("Prince", maxEnergy);

			expect(myActor.maxEnergy).to.equal(maxEnergy);
		});
	});
});
