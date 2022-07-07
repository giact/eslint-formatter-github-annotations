/* eslint-disable total-functions/no-unsafe-type-assertion */
/**
 * @file Tests for github-annotations formatter.
 */

import assert from 'assert';
import {ESLint} from 'eslint';
import formatter from '../dist';

describe('formatter:compact', () => {
  describe('when passed no messages', () => {
    const code: ReadonlyArray<ESLint.LintResult> = [
      {
        filePath: 'foo.js',
        messages: [],
      } as unknown as ESLint.LintResult,
    ];

    it('should return nothing', () => {
      const result = formatter(code);

      assert.strictEqual(result, 'no problems');
    });
  });

  describe('when passed an error message', () => {
    const code: ReadonlyArray<ESLint.LintResult> = [
      {
        filePath: 'foo.js',
        errorCount: 1,
        warningCount: 0,
        messages: [
          {
            message: 'Unexpected foo.',
            severity: 2,
            line: 5,
            column: 10,
            ruleId: 'foo',
          },
        ],
      } as unknown as ESLint.LintResult,
    ];

    it('should return a string in the format ::error', () => {
      const result = formatter(code);

      assert.strictEqual(
        result,
        '::group::EsLint foo.js: errors=1 warnings=0\n::error file=foo.js,line=5,col=10::[foo] Unexpected foo.\n::endgroup::\n\n1 problem'
      );
    });

    it('should return a string in the format ::warning', () => {
      const message = code[0]?.messages[0];
      if (message) {
        message.severity = 1;
      }
      const result = formatter(code);

      assert.strictEqual(
        result,
        '::group::EsLint foo.js: errors=1 warnings=0\n::warning file=foo.js,line=5,col=10::[foo] Unexpected foo.\n::endgroup::\n\n1 problem'
      );
    });
  });
});
