var expect = require("chai").expect;

var $time = require("royal/clock");
var $math = require("royal/math");

describe("royal/time", function()
{
        var manualClock;

        beforeEach(function()
        {
                manualClock = new $time.buildManualClock();
                manualClock.setTime(1234);
        });

        describe("ManualClock", function()
        {
                it("returns the time that is passed to it", function()
                {
                        expect(manualClock.getTime()).to.equal(1234);
                });
        });

        describe("PlusClock", function()
        {
                it("returns the time of the parent clock, plus an offset", function()
                {
                        var plusClock = $time.buildPlusClock(manualClock);
                        plusClock.setPlusTime(1000);

                        expect(plusClock.getPlusTime()).to.equal(1000);
                        expect(plusClock.getTime()).to.equal(2234);
                });
        });

        describe("StopClock", function()
        {
                var stopClock;

                beforeEach(function()
                {
                        stopClock = $time.buildStopClock(manualClock);
                });

                it("returns the change in time of the parent clock while StopClock is in a \"running\" state", function()
                {
                        expect(stopClock.getTime()).to.equal(1234);

                        manualClock.setTime(2000);
                        expect(stopClock.getTime()).to.equal(2000);

                        stopClock.stop();
                        manualClock.setTime(3000);
                        expect(stopClock.getTime()).to.equal(2000);

                        stopClock.start();
                        manualClock.setTime(3512);
                        expect(stopClock.getTime()).to.equal(2512);
                });

                describe("start()", function()
                {
                        it("does nothing if StopClock is already running", function()
                        {
                                expect(stopClock.getTime()).to.equal(1234);

                                manualClock.setTime(2000);
                                expect(stopClock.getTime()).to.equal(2000);

                                stopClock.start();
                                manualClock.setTime(3000);
                                expect(stopClock.getTime()).to.equal(3000);
                        });
                });

                describe("stop()", function()
                {
                        it("does nothing if StopClock is not running", function()
                        {
                                expect(stopClock.getTime()).to.equal(1234);

                                manualClock.setTime(2000);
                                expect(stopClock.getTime()).to.equal(2000);

                                stopClock.stop();
                                manualClock.setTime(3000);
                                expect(stopClock.getTime()).to.equal(2000);

                                stopClock.stop();
                                manualClock.setTime(3512);
                                expect(stopClock.getTime()).to.equal(2000);
                        });
                });

                describe("toggle()", function()
                {
                        it("changes state to \"not running\" if StopClock is \"running\"", function()
                        {
                                stopClock.setRunning(true);
                                expect(stopClock.isRunning()).to.equal(true);
                                // RUNNING //
                                stopClock.toggle();
                                // NOT RUNNNING //
                                expect(stopClock.isRunning()).to.equal(false);
                        });

                        it("changes state to \"running\" if StopClock is \"not running\"", function()
                        {
                                stopClock.setRunning(false);
                                expect(stopClock.isRunning()).to.equal(false);
                                // NOT RUNNING //
                                stopClock.toggle();
                                // RUNNNING //
                                expect(stopClock.isRunning()).to.equal(true);
                        });
                });
        });

        describe("deltaClock", function()
        {
                it("keeps track of how much time passed between each \"lap()\"", function()
                {
                        var deltaClock = $time.buildDeltaClock(manualClock);
                        expect(deltaClock).not.to.equal(null);
                        expect(deltaClock.getTime()).to.equal(1234);
                        expect(deltaClock.getDeltaTime()).to.equal(0);

                        manualClock.setTime(2000);
                        expect(deltaClock.getTime()).to.equal(1234);
                        expect(deltaClock.getDeltaTime()).to.equal(0);

                        deltaClock.lap();
                        expect(deltaClock.getTime()).to.equal(2000);
                        expect(deltaClock.getDeltaTime()).to.equal(766);

                        deltaClock.clear();
                        expect(deltaClock.getTime()).to.equal(2000);
                        expect(deltaClock.getDeltaTime()).to.equal(0);
                });
        });

        describe("speedClock", function()
        {
                it("progressed time at a specified rate", function()
                {
                        var speedClock = $time.buildSpeedClock(manualClock);
                        expect(speedClock.getTime()).to.equal(1234);
                        expect(speedClock.getSpeed()).to.equal(1);

                        manualClock.setTime(2000);
                        expect(speedClock.getTime()).to.equal(2000);

                        speedClock.setSpeed(0.5);
                        manualClock.setTime(3000);
                        expect(speedClock.getTime()).to.equal(2500);
                });
        });

        describe("motionClock", function()
        {
                var motionClock;

                beforeEach(function()
                {
                        motionClock = $time.buildMotionClock(manualClock);
                        motionClock.setFilter($math.filters.linear);
                });

                it("prodives a transition to animate the progression of time", function()
                {
                        expect(motionClock.getTime()).to.equal(1234);

                        manualClock.setTime(2000);
                        expect(motionClock.getTime()).to.equal(2000);

                        motionClock.move(10000, 2000);
                        expect(motionClock.getTime()).to.equal(2000);

                        manualClock.setTime(3000);
                        expect(motionClock.getTime()).to.equal(7000);

                        manualClock.setTime(4000);
                        expect(motionClock.getTime()).to.equal(12000);
                });

                it("resets the motion if move() is called during a motion",
                                function()
                {
                        manualClock.setTime(2000);
                        motionClock.move(8000, 2000);
                        manualClock.setTime(3000);
                        expect(motionClock.getTime()).to.equal(6000);

                        motionClock.move(6000, 1000);
                        expect(motionClock.getTime()).to.equal(6000);

                        manualClock.setTime(3500);
                        expect(motionClock.getTime()).to.equal(11000);

                        manualClock.setTime(4000);
                        expect(motionClock.getTime()).to.equal(16000);
                });
        });

        describe("buildClock(clockTypes...)", function()
        {
                it("builds a clock hierarchy from a list of clock types", function()
                {
                        var clock = $time.buildClock("ManualClock", "DeltaClock");
                        expect(clock).not.to.be.null;
                });

                it("throws exception if a clock type can't be found by name", function()
                {
                        var runBuildClock = function()
                        {
                                var clock = $time.buildClock("ManualClock", "FakeClock");
                        };

                        expect(runBuildClock).to.throw("Could not find builder " +
                                        "\"buildFakeClock\" in time module to build " +
                                        "\"FakeClock\"");
                });
        });

        describe("buildFullClock()", function()
        {
                it("builds a full clock", function()
                {
                        var clock = $time.buildFullClock();
                        expect(clock).not.to.equal(undefined);
                });
        });

        describe("formatTime(milliseconds)", function()
        {
                var timeStr = $time.formatTime(1234);
                expect(timeStr).to.equal("1s");

                timeStr = $time.formatTime(123456);
                expect(timeStr).to.equal("2m 03s");

                timeStr = $time.formatTime(12345678);
                expect(timeStr).to.equal("3h 25m 46s");

                timeStr = $time.formatTime(1234567890);
                expect(timeStr).to.equal("14d 06h 56m 08s");
        });
});
