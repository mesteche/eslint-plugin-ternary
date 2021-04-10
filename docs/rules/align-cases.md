# align tests together in chained ternaries (align-cases)

Aligning tests together in a chained ternary makes it easier to visually parse, and jump to the case you're interested in.

When this rule is enabled, make sure that eslint's indent rule is configured to ignore ternaries:

```json
{
    "rules": [
        "@mesteche/neat-ternaries/align-cases": ["error"],
        "indent": ["error", 2, { "ignoredNodes": ["ConditionalExpression"] }]
    ]
}
```

## Rule Details

This rule aims to make sure that the tests in a chained ternary are aligned with each other.

Examples of **incorrect** code for this rule:

```js
const result = test1 ? consequent1 : 
test2 ? consequent2 : 
test3 ? consequent3 : defaultValue
```

Examples of **correct** code for this rule:

```js
const result = test1 ? consequent1 : 
               test2 ? consequent2 : 
               test3 ? consequent3 : defaultValue
```
