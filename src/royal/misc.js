// TODO: [prince] Move this
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