/**
 * @fileoverview align tests together in chained ternaries
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/align-cases"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });
ruleTester.run("align-cases", rule, {
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
        const result = test1 ? consequent1 :
        test2 ? consequent2 :
        test3 ? consequent3 : defaultValue`,
        output: `
        const result = test1 ? consequent1 :
                       test2 ? consequent2 :
                       test3 ? consequent3 : defaultValue`,
        errors: [
          { message: 'Align ternaries on the first one in chain' },
          { message: 'Align ternaries on the first one in chain' },
        ],
      }],
});
