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
        fixable: "whitespace",  // or "code" or "whitespace"
        schema: []
    },

    create: function(context) {
        const src = context.getSourceCode()
        return {
            ConditionalExpression(node) {
                const endCausality = src.getTokenAfter(node.consequent, { filter: t => t.value === ':'})
                if (node.loc.start.line !== endCausality.loc.end.line) {
                  const firstToken = src.getFirstToken(node)
                  const tokens = [
                    firstToken,
                    ...src.getTokensBetween(firstToken, endCausality, { includeComments: true }),
                    endCausality
                  ]
                  context.report({
                    node,
                    message: 'Don\'t spread cases over multiple lines',
                    fix: fixer => [fixer.replaceTextRange(
                      [node.range[0], endCausality.range[1]],
                      tokens.map(({type, value}) => (
                        type === "Block" ? `/*${value}*/`.replaceAll(/\n|\r\n/g, ' ') :
                        type === "Line"  ? `/*${value}*/` :
                                           value
                      )).join(' ')
                    )],
                  })
                }
              }
        };
    }
};
