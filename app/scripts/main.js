// main.js

var math = namespace.getNode("com.everempire.royal.math");
var time = namespace.getNode("com.everempire.royal.time");

var activity = namespace.getNode("com.everempire.hime.activity");

var progLog = function( progress ) { console.log( "Prog: " + progress ); };
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