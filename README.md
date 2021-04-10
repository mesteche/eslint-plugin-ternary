# eslint-plugin-neat-ternaries

format chained ternaries to optimize readability

- Each line correspond to a case (condition/value pair)
- The chained ternary is formatted in two columns:
    - The left column is for conditions
    - The right column is for the matching values (including the default value)


Like this:
```js
const neatTernary = someCondition       ? someValue :
                    someOtherCondition  ? someOtherValue :
                    yetAnotherCondition ? yetAnotherValue :
                                          defaultValue
```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i -D eslint
```

Next, install `@mesteche/eslint-plugin-neat-ternaries`:

```
$ npm i -D @mesteche/eslint-plugin-neat-ternaries
```


## Usage

Add `@mesteche/neat-ternaries` to the plugins section of your `.eslintrc` configuration file:

```json
{
    "plugins": [
        "@mesteche/neat-ternaries"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@mesteche/neat-ternaries/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here

- [`@mesteche/neat-ternaries/align-cases`](docs/rules/align-cases.md)
- [`@mesteche/neat-ternaries/align-outcomes`](docs/rules/align-outcomes.md)
- [`@mesteche/neat-ternaries/one-line-per-case`](docs/rules/one-line-per-case.md)
- [`@mesteche/neat-ternaries/no-nested-ternary`](docs/rules/no-nested-ternary.md)
- [`@mesteche/neat-ternaries/one-case-per-line`](docs/rules/one-case-per-line.md)
