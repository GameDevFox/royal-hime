namespace( "com.everempire.royal.math", function() 
{
	this.filters = {};
	
	this.filters.linear = function( theta )
	{
		return theta;
	};
	
	this.filters.easeInCubic = function( theta )
	{
		return Math.pow( theta - 1, 3 ) + 1;
	};
	
	this.filters.easeOutCubic = function( theta )
	{
		return Math.pow( theta , 3 );
	};
});

