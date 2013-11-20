(function()
{
	//Bootstrap angular js
	$(document).ready( function() { 
		angular.bootstrap( $("body"), [ "Hime", "Time", "Area", "Actor" ] );
	});
}());

window.getScope = function( selector )
{
	return angular.element($( selector )).scope();
};