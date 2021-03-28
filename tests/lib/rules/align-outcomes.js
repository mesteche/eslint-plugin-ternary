/**
 * @fileoverview align the outcomes off every ternary in a chain
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/align-outcomes"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });
ruleTester.run("align-outcomes", rule, {
    valid:   [{ 
        code: `
        test1plop ? consequent1 :
        test2     ? consequent2 :
                    'default'`
      }],
      invalid: [{
        code: `
        const result = test1plop ? consequent1 : 
        test2 ? consequent2 : 
        'default'`,
        output: `
        const result = test1plop ? consequent1 : 
        test2 ? consequent2 : 
                                   'default'`,
        errors: [
          { message: 'Align outcomes in chain' },
          { message: 'Align outcomes in chain' },
        ],
      },{
        code: `
        const result = test1plop ? consequent1 : 
                       test2 ? consequent2 : 
                       'default'`,
        output: `
        const result = test1plop ? consequent1 : 
                       test2     ? consequent2 : 
                                   'default'`,
        errors: [
          { message: 'Align outcomes in chain' },
          { message: 'Align outcomes in chain' },
        ],
      }],
});
