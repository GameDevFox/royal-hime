(function()
{
	this.hasBothNodes = function( relation, nodeA, nodeB )
	{
		var hasBothNodes = 
			( relation[0] == nodeA && relation[1] == nodeB ) ||
			( relation[0] == nodeB && relation[1] == nodeA );
		return hasBothNodes;
	};
	
	this.getRelation = function( relations, nodeA, nodeB )
	{
		var relation = _.find( relations, function( relation )
		{
			var hasBothNodes = this.hasBothNodes( relation, nodeA, nodeB );
			return hasBothNodes;
		});
		
		return relation;
	};
	
	namespace.namespace("com.everempire.royal.relationship", function()
	{
		this.createRelationshipSystem = function()
		{
			var relationshipSystem = {};
			
			relationshipSystem.relations = [];
			
			relationshipSystem.addRelationship = function( nodeA, nodeB )
			{
				if( relationshipSystem.hasRelationship( nodeA, nodeB ) )
				{
					throw { 
						msg: "There is already a relationship between these two nodes", 
						nodeA: nodeA,
						nodeB: nodeB
					};
				}
				
				var relation = [ nodeA, nodeB ];
				relationshipSystem.relations.push( relation );
			};
			
			relationshipSystem.removeRelationship = function( nodeA, nodeB )
			{
				if( !relationshipSystem.hasRelationship( nodeA, nodeB ) )
				{
					throw { 
						msg: "There is no relationship between these two nodes", 
						nodeA: nodeA,
						nodeB: nodeB
					};
				}
				
				relationshipSystem.relations = _.reject( relationshipSystem.relations, function( relation )
				{
					var hasBothNodes = this.hasBothNodes( relation, nodeA, nodeB );
					return hasBothNodes;
				});
			};
			
			relationshipSystem.hasRelationship = function( nodeA, nodeB )
			{
				var relation = getRelation( relationshipSystem.relations, nodeA, nodeB );
				var hasRelationship = ( relation != undefined );
				
				return hasRelationship;
			};
			
			relationshipSystem.getRelatedNodes = function( node )
			{
				var filteredRelations = _.filter( relationshipSystem.relations, function( relation )
				{
					var hasNode = relation[0] == node || relation[1] == node;
					return hasNode;
				});
				
				var relations = _.map( filteredRelations, function( relation )
				{
					var remainingNodeArray = _.without( relation, node );
					var remainingNode = remainingNodeArray[0];
					return remainingNode;
				});
				
				return relations;
			};
			
			return relationshipSystem;
		};
	});
}());
