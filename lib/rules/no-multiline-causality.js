/**
 * @fileoverview report when a pair of test + consequent are spread accross multiple lines
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "report when a pair of test + consequent are spread accross multiple lines",
            category: "Stylistic Issues",
            recommended: true
        },
        fixable: null,  // or "code" or "whitespace"
        schema: []
    },

    create: function(context) {
        const src = context.getSourceCode()
        return {
            ConditionalExpression(node) {
                const endCausality = src.getTokenAfter(node.consequent, { filter: t => t.value === ':'})
                if (node.loc.start.line !== endCausality.loc.end.line) {
                  context.report({
                    node,
                    message: 'Don\'t spread condition and consequent over multiple lines',
                    suggest: [{
                      desc: 'remove the linebreaks',
                      fix: fixer => [fixer.replaceTextRange(
                        [node.range[0], endCausality.range[1]],
                        src.text.slice(node.range[0], endCausality.range[1]).replaceAll('\n', '')
                      )],
                    }]
                  })
                }
              }
        };
    }
};
