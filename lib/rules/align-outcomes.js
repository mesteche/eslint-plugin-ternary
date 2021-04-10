/**
 * @fileoverview align the outcomes off every ternary in a chain
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "align the outcomes off every ternary in a chain",
            category: "Fill me in",
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
          
          const canFix = (node, first) => node.loc.start.column === first.loc.start.column

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
          ConditionalExpression(node) {
            if (isChained(node)) {
              let first = node
              while (first.parent.alternate === first) first = first.parent
    
              let largest = {
                node: first,
                size: src.getTokenAfter(first.test, { filter: t => t.value === '?' }).range[1] - first.range[0]
              }
              let n = first
              while (n.alternate.type === 'ConditionalExpression') {
                n = n.alternate
                const nSize = src.getTokenAfter(n.test, { filter: t => t.value === '?' }).range[1] - n.range[0]
                if (nSize > largest.size) largest = { node: n, size: nSize }
              }
    
              const interogator = src.getTokenAfter(node.test, { filter: t => t.value === '?' })
              const nSize = src.getTokenAfter(node.test, { filter: t => t.value === '?' }).range[1] - node.range[0]
    
              if (nSize < largest.size) {
                context.report({
                  node: interogator,
                  message: 'Align outcomes in chain',
                  fix: fixer => canFix(node, first) ? [fixer.insertTextBefore(interogator, ' '.repeat(largest.size - nSize))] : []
                })
              }
              
              if (node.alternate.type !== 'ConditionalExpression') {
                const searchStart = src.getTokenBefore(node.alternate, { filter: t => t.value === ':' })
                const tokens = src.getTokensBetween(searchStart, node.alternate)
                const largestParens = getLargestParens(tokens)
                const realBegining = largestParens || node.alternate
                const prevToken = src.getTokenBefore(realBegining, { includeComments: true })
                const diff = (largest.size + first.loc.start.column) - realBegining.loc.start.column
                
                if (realBegining.loc.start.line > prevToken.loc.end.line && diff > 0) {
                  context.report({
                    node: realBegining,
                    message: 'Align outcomes in chain',
                    fix: fixer => [fixer.insertTextBefore(realBegining, ' '.repeat(diff + 1))]
                  })
                }
              }
            }
          }
        };
    }
};
