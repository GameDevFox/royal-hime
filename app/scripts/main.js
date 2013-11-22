(function()
{
	//Bootstrap angularjs
	$(document).ready( function() 
	{
		var injector = angular.bootstrap( $("body"), [ "Hime", "Time", "Area"] );
	
		window.hime = getScope(".hime-control").hime;
	});
}());

window.getScope = function( selector )
{
	return angular.element($( selector )).scope();
};