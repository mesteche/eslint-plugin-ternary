/**
 * @fileoverview align tests together in chained ternaries
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "align tests together in chained ternaries",
            category: "Fill me in",
            recommended: false
        },
        fixable: "whitespace",
        schema: []
    },

    create: function(context) {
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            'ConditionalExpression[alternate.type=ConditionalExpression] > [alternate]'(node) {
                let first = node
                while (first.parent.alternate === first) first = first.parent
                if (node.loc.start.column < first.loc.start.column) {
                  context.report({
                    node,
                    message: 'Align ternaries on the first one in chain',
                    fix: fixer => [fixer.insertTextBefore(
                      node,
                      ' '.repeat(first.loc.start.column - node.loc.start.column)
                    )]
                  })
                }
              }
        };
    }
};
