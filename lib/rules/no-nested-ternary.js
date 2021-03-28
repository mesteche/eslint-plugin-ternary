/**
 * @fileoverview forbid nested ternary
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "forbid nested ternary",
            category: "Stylistic Issues",
            recommended: true,
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        return {
            'ConditionalExpression[consequent.type=ConditionalExpression]': node => {
                context.report(node.consequent, 'Don\'t nest ternary, use chaining instead') 
              }
        };
    }
};
