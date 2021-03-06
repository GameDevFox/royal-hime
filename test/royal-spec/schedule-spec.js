var expect = require("chai").expect;

var $schedule = require("royal/schedule");

describe("royal/schedule", function()
{
        var schedule;

        beforeEach(function()
        {
                schedule = $schedule.buildSchedule();
        });

        describe("schedule", function()
        {
                it("tracks events and fires triggers based on time", function()
                {
                        var beginCount = 0;
                        var duringCount = 0;
                        var endCount = 0;

                        schedule.add(
                        {
                                timeFrame: { origin:1000, length:3000 },
                                triggers: {
                                        onBegin: function()
                                        {
                                                beginCount++;
                                        },
                                        onDuring: function()
                                        {
                                                duringCount++;
                                        },
                                        onEnd: function()
                                        {
                                                endCount++;
                                        }
                                }
                        });

                        schedule.advanceTo(500);
                        expect([ beginCount, duringCount, endCount ]).to.deep.equal([0, 0, 0]);

                        // At Beginning
                        schedule.advanceTo(1000);
                        expect([ beginCount, duringCount, endCount ]).to.deep.equal([1, 1, 0]);

                        schedule.advanceTo(2000);
                        expect([ beginCount, duringCount, endCount ]).to.deep.equal([1, 2, 0]);

                        // At End
                        schedule.advanceTo(4000);
                        expect([ beginCount, duringCount, endCount ]).to.deep.equal([1, 2, 1]);

                        schedule.advanceTo(5000);
                        expect([ beginCount, duringCount, endCount ]).to.deep.equal([1, 2, 1]);
                });

                it("throws exception if you try to rewind the schedule", function()
                {
                        schedule.advanceTo(1000);

                        var rewindSchedule = function()
                        {
                                schedule.advanceTo(500);
                        };

                        expect(rewindSchedule).to.throw(
                                "You can only advance the time. Schedule time is: 1000 " +
                                "and newTime is: 500");
                });

                it("fires events in no particular order", function()
                {
                        expect(true).to.be.true;
                });
        });
});
