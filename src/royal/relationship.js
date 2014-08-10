var _ = require("lodash");

var relationship = {};

var hasNode = function( nodes, node )
{
        var result = nodes[0] == node || nodes[1] == node;
        return result;
};

var hasBothNodes = function( nodes, nodeA, nodeB )
{
        var result =
                ( nodes[0] == nodeA && nodes[1] == nodeB ) ||
                ( nodes[0] == nodeB && nodes[1] == nodeA );
        return result;
};

var getRelation = function( relations, nodeA, nodeB )
{
        var relation = _.find( relations, function( relation )
        {
                var result = hasBothNodes( relation.nodes, nodeA, nodeB );
                return result;
        });

        return relation;
};

relationship.buildRelationshipSystem = function()
{
        var relationshipSystem = {};

        relationshipSystem.relations = [];

        relationshipSystem.createRelationship = function( nodeA, nodeB )
        {
                if( relationshipSystem.hasRelationship( nodeA, nodeB ) )
                {
                        throw {
                                msg: "There is already a relationship between these two nodes",
                                nodeA: nodeA,
                                nodeB: nodeB
                        };
                }

                var data = {};
                var relation = { nodes: [ nodeA, nodeB ], data: data };
                relationshipSystem.relations.push( relation );

                return data;
        };

        relationshipSystem.getRelationship = function( nodeA, nodeB )
        {
                if( !relationshipSystem.hasRelationship( nodeA, nodeB ) )
                {
                        return null;
                }

                var relation = getRelation( relationshipSystem.relations, nodeA, nodeB );
                var data = relation.data;

                return data;
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
                        var result = hasBothNodes( relation.nodes, nodeA, nodeB );
                        return result;
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
                // Get all relations that have this node
                var filteredRelations = _.filter( relationshipSystem.relations, function( relation )
                {
                        var result = hasNode( relation.nodes, node);
                        return result;
                });

                var relatedNodes = _.map( filteredRelations, function( relation )
                {
                        var remainingNodeArray = _.without( relation.nodes, node );
                        var remainingNode = remainingNodeArray[0];
                        return remainingNode;
                });

                return relatedNodes;
        };

        relationshipSystem.getRelatedNode = function( node )
        {
                // Get all relations that have this node
                var relation = _.find( relationshipSystem.relations, function( relation )
                {
                        var result = hasNode( relation.nodes, node);
                        return result;
                });

                if( relation == null )
                {
                        return null;
                }

                var resultArray = _.without(relation.nodes, node);
                var result = resultArray[0];

                return result;
        };

        relationshipSystem.getAllRelationships = function()
        {
                return relationshipSystem.relations;
        };

        relationshipSystem.getAllNodes = function()
        {
                var nodeArrays = _.map(relationshipSystem.relations, function(relation)
                {
                        return relation.nodes;
                });

                var nodes = _.flatten( nodeArrays );
                var uniqNodes = _.uniq( nodes );

                return uniqNodes;
        };

        return relationshipSystem;
};

module.exports = relationship;