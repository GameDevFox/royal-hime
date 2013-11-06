function object( obj ) 
{
	function F() {};
	F.prototype = obj;
	return new F();
}

function assert( condition, message )
{
	if( !condition )
	{
		throw message || "Assertion failed";
	}
}

function firstIndexOf( parent, child )
{
	for( i in parent )
	{
		if( child === parent[i] )
		{
			return i;
		}
	}
	
	return null;
}

function logFunc( msg )
{
	return function() 
	{
		console.log( msg );
	};
}

window.requestAnimFrame = (function(callback) 
{
	var frameFunction = 
		window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
	  	};
  	
  	return frameFunction;
})();