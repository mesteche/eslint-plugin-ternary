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

var ruleTester = new RuleTester();
ruleTester.run("one-case-per-line", rule, {
    valid:   [
        { code: "test1 ? consequent1 :\n test2 ? consequent2 :\n 'default'" },
        { code: "test1 ? consequent1 :// endline comment\n test2 ? consequent2 :/* another comment*/\n 'default'" },
      ],
      invalid: [{
        code: "test1 ? consequent1 : test2\n ? consequent2 : 'default'",
        errors: [
          { message: 'Don\'t share causality line' },
          { message: 'Don\'t share causality line' },
        ],
        output: "test1 ? consequent1 : \ntest2\n ? consequent2 : \n'default'",
      }],
});
