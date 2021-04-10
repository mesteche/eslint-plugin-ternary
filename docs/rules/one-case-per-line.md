# keep each pair of test + consequent on a separate line (one-case-per-line)

To make chained ternaries easier to read, lines shouldn't be shared between different cases (pair of `test` + `consequent`).

This rule ensures that a case in a chained ternary is always on a separate line from the previous one.

This rule works best in cunjunction with the `one-line-per-case` rule

## Rule Details

This rule aims to make sure that each case in a chained ternary starts on it's own line.

Examples of **incorrect** code for this rule:

```js
const result = test1 ? consequent1 : test2
? consequent2 : 'default'
```

Examples of **correct** code for this rule:

```js
const result = test1 ? consequent1 : 
test2 ? consequent2 : 
'default'
```
