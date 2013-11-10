namespace( "com.everempire.royal.math", function() 
{
	this.filters = {
		
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
	};
});