namespace( "com.everempire.hime", function() {
	
	var hime = this;
	
	hime.buildArm = function()
	{
		var arm = {
			hand: {}
		};
		
		return arm;
	};
	
	hime.buildLeg = function()
	{
		var leg = {
			foot: {}
		};
		
		return leg;
	};
	
	hime.buildBody = function()
	{
		var leftArm = this.buildArm();
		var rightArm = this.buildArm();
		
		var leftLeg = this.buildLeg();
		var rightLeg = this.buildLeg();
		
		var body = { 
			head: {  
				hair: {},
				eyes: {
					left: {},
					right: {}
				},
				ears: {
					left: {},
					right: {}
				},  
				nose: {},
				mouth: {
					tongue: {}
				}, 
				neck: {}
			}, 
			arms: {
				left: leftArm,
				right: rightArm,
			},
			torso: {  
				sholders: {
					left: {},
					right: {}
				},
				chest: {},
				waist: {},
				belly: {},
				back: {
					upper: {},
					lower: {}
				},
				crotch: {},
				bottom: {},
			},
			legs: {
				left: leftLeg,
				right: rightLeg,
			}
		};
		
		return body;
	};
	
	hime.buildHime = function( name )
	{
		var body = this.buildBody();
		
		var hime = {
			name: name,
			body: body,
		};
		
		return hime;
	};
});