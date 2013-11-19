(function()
{
	// TODO: Factor this INTO the app
	var activity = namespace.getNode("com.everempire.hime.activity");
	
	window.activityService = activity.buildActivityService();

	window.getScope = function( selector )
	{
		return angular.element($( selector )).scope();
	};

	//Bootstrap angular js
	$(document).ready( function() { 
		angular.bootstrap( $("body"), [ "Hime", "Time", "Area", "Actor" ] );
		window.bodyScope = window.getScope( "body" );
	});
}());
