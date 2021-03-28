# forbid nested ternary (no-nested-ternary)

This rule report nested ternaries, not to be confused with chained ternaries.
Nested ternaries are usually hard to read, and many other eslint rules forbid them entirely.
However, these rules tend to forbid chained ternary as well, which is unfortunate.
This rule forbid having a ternary as `consequent` of another, but allows a ternary to be the `alternate` of another.

## Rule Details

This rule aims to prevent nested ternaries to creep up in your codebase.

Examples of **incorrect** code for this rule:

```js
const result = someVar >= 0 ? (someVar === 0 ? 'meh' : 'yep')
  : 'nop'
```

Examples of **correct** code for this rule:

```js
const result = someVar > 0   ? 'yep' :
               someVar === 0 ? 'meh' :
                               'nop'
```
