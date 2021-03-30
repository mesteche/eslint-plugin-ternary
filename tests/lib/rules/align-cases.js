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

var ruleTester = new RuleTester();
ruleTester.run("align-cases", rule, {
    valid:   [
        { code: "test1 ? consequent1 :\n test2 ? consequent2 :\n 'default'" },
        { code: "test1 ? consequent1 :// endline comment\n test2 ? consequent2 :/* another comment*/\n 'default'" },
      ],
      invalid: [{
        code: "var result = test1 ? consequent1 : \ntest2 ? consequent2 : \n'default'",
        output: "var result = test1 ? consequent1 : \n             test2 ? consequent2 : \n'default'",
        errors: [
          { message: 'Align ternaries on the first one in chain' },
        ],
      }],
});
