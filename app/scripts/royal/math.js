define( function() {
	
	var math = 
	{
		filters: 
		{
		
			linear: function( theta )
			{
				return theta;
			},
			
			easeInCubic: function( theta )
			{
				return Math.pow( theta - 1, 3 ) + 1;
			},
			
			easeOutCubic: function( theta )
			{
				return Math.pow( theta , 3 );
			}
		}
	};
	
	return math;
} );