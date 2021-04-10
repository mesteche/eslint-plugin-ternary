# align the outcomes off every ternary in a chain (align-outcomes)

Aligning outcomes together in a chained ternary makes it easier to visually parse, and find the value you're interested in.

This rule works best in cunjunction with the `align-cases` rule

## Rule Details

This rule aims to make sure that the outcomes in a chained ternary are aligned with each other.

Examples of **incorrect** code for this rule:

```js
const result = longTest1 ? consequent1 :
               test2 ? consequent2 :
               'default'
```

Examples of **correct** code for this rule:

```js
const result = longTest1 ? consequent1 :
               test2     ? consequent2 :
                           'default'
```
