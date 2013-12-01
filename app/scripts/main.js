(function()
{
	//Bootstrap angularjs
	$(document).ready( function() 
	{
		var injector = angular.bootstrap( $("body"), [ "Hime", "Time", "Area"] );
	
		window.hime = getScope("body").hime;
	});
}());

window.getScope = function( selector )
{
	return angular.element($( selector )).scope();
};