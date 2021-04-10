/**
 * @fileoverview keep each pair of test + consequent on a separate line
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "keep each pair of test + consequent on a separate line",
            recommended: false
        },
        fixable: "whitespace",
        schema: []
    },

    create: function(context) {
        const src = context.getSourceCode()
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        const isChained = node => (
            node.alternate.type === 'ConditionalExpression' ||
            node.parent.alternate === node ||
            false
          )
          
          const getLargestParens = (tokens = []) => {
            const openParens = tokens.reduce((acc, t) => (
              t.value === '(' ? acc.concat(t) :
              t.value === ')' ? acc.pop() && acc :
              acc
            ), [])
            return openParens[0]
          }
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ConditionalExpression(node) {
                if (isChained(node)) {
                  const searchStart = src.getTokenBefore(node.alternate, { filter: t => t.value === ':' })
                  const tokens = src.getTokensBetween(searchStart, node.alternate)
                  const largestParens = getLargestParens(tokens)
                  const realBegining = largestParens || node.alternate
                  const prevToken = src.getTokenBefore(realBegining, { includeComments: true })
                  if (realBegining.loc.start.line <= prevToken.loc.end.line) {
                    context.report({
                      node: realBegining,
                      message: 'Don\'t share lines between cases',
                      fix: fixer => [fixer.insertTextBefore(realBegining, '\n')]
                    })
                  }
                }
              }
        };
    }
};
