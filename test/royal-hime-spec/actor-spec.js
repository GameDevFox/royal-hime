define(["royal-hime/actor"], function($actor)
{
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
				expect(myActor.maxEnergy).toEqual(100);
			});

			it("builds an actor with energy equals to maxEnergy", function()
			{
				expect(myActor.energy).toEqual(myActor.maxEnergy);
			});

			it("builds an actor with a specified amount of maxEnergy", function()
			{
				var maxEnergy = 123;
				myActor = $actor.buildActor("Prince", maxEnergy);

				expect(myActor.maxEnergy).toEqual(maxEnergy);
			});
		});
	});
});
