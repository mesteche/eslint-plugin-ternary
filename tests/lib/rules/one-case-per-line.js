/**
 * @fileoverview keep each pair of test + consequent on a separate line
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/one-case-per-line"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });
ruleTester.run("one-case-per-line", rule, {
  valid:   [{
    code: `
    test1 ? consequent1 :
    test2 ? consequent2 :
    'default'`
  }, {
    code: `
    test1 ? consequent1 :// endline comment
    test2 ? consequent2 :/* another comment*/
    'default'`
  }],
  invalid: [{
    code: `
    test1 ? consequent1 : test2
    ? consequent2 : 'default'`,
    output: `
    test1 ? consequent1 : 
test2
    ? consequent2 : 
'default'`,
    errors: [
      { message: 'Don\'t share lines between cases' },
      { message: 'Don\'t share lines between cases' },
    ],
  }],
});
