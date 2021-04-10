# report when a pair of test + consequent are spread accross multiple lines (one-line-per-case)

Spreading a single case of over multiple lines, in a chained ternary, makes it hard to read.
This rule ensure that this doesn't happen.
## Rule Details

This rule aims to make sure that cases in a chained ternary don't take more than one line.

Examples of **incorrect** code for this rule:

```js
const result = (someVar >
      /* block
      comment */ 0) ?// inline comment
     'yeah' : 'no'
```

Examples of **correct** code for this rule:

```js
const result = (someVar > /* block comment */ 0) ? 'yeah' : 'no'
```
