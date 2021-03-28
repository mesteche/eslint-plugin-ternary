/**
 * @fileoverview forbid nested ternary
 * @author Estephe Bouvet
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-nested-ternary"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-nested-ternary", rule, {
    valid: [{
        code: `
someVar > 0   ? 'yep' :
someVar === 0 ? 'meh' :
                'nop'
`
    }],
    invalid: [
        {
            code: "someVar >= 0 ? (someVar === 0 ? 'meh' : 'yeah') : 'no'",
            errors: [{
                message: "Don't nest ternary, use chaining instead",
                type: "ConditionalExpression"
            }]
        }
    ]
});
