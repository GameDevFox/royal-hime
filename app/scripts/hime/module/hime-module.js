( function() 
{
	define( function()
	{
		var HimeModule = function( $filterProvider ) 
		{	
			$filterProvider.register( "capitalize", function() 
			{
				return function( text )
				{
					if( text == null )
						return;
					
					var result = text.trim();
					return result.charAt(0).toUpperCase() + result.slice(1);
				};
			});
		};
		
		return HimeModule;
	} );
}() )

