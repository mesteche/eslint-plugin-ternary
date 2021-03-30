/**
 * @fileoverview report when a pair of test + consequent are spread accross multiple lines
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/one-line-per-case"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("one-line-per-case", rule, {
    valid: [
        { code: "someVar > 0 ? 'yeah' : 'no';" },
        { code: "someVar > 0 ? 'yeah' :\n 'no';" },
    ],
    invalid: [{
        code: "(someVar >\n 0) ? 'yeah' : 'no'",
        errors: [{ message: 'Don\'t spread condition and consequent over multiple lines' }],
        output: "(someVar>0)?'yeah': 'no'"
      },{
        code: "(\nsomeVar > 0) ? 'yeah' : 'no'",
        errors: [{ message: 'Don\'t spread condition and consequent over multiple lines' }],
        output: "(someVar>0)?'yeah': 'no'"
      },{
        code: "(someVar >\n/* multiline\r\ncomment */ 0) ?// inline comment\n 'yeah' : 'no'",
        errors: [{ message: 'Don\'t spread condition and consequent over multiple lines' }],
        output: "(someVar>/* multiline comment */0)?/* inline comment*/'yeah': 'no'"
      }],
});
