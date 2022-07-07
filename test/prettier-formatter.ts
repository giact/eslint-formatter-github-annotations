/* eslint-disable total-functions/no-unsafe-type-assertion */
/**
 * @file Tests for the Prettier formatter.
 */

import {assert} from 'chai';
import * as child from 'child_process';
import path from 'path';

function runFormatter(input: string) {
  const prettier = path.join(__dirname, '../dist/bin-prettier-formatter-github.js');
  const result = child.spawnSync('node', [prettier], {
    input: input,
    encoding: 'utf8',
  });
  return result;
}

describe('prettier-formatter-github', () => {
  describe('when passed no messages', () => {
    const result = runFormatter('');
    it('the process should not terminate unexpectedly', () => {
      assert.notInstanceOf(result, Error);
    });
    it('should return nothing', () => {
      assert.strictEqual(result.stdout?.toString() ?? '', '');
    });
    it('should return without exit code', () => {
      assert.strictEqual(result.status, 0);
    });
  });

  describe('when passed some file paths', () => {
    const result = runFormatter('foo.js\nbar.js');
    it('the process should not terminate unexpectedly', () => {
      assert.notInstanceOf(result, Error);
    });
    it('should return a string in the format ::error', () => {
      assert.strictEqual(
        result.stdout?.toString() ?? '',
        '::error file=foo.js::Code style issues found: please run prettier on this file\n' +
          '::error file=bar.js::Code style issues found: please run prettier on this file\n'
      );
    });
    it('should return with an exit code', () => {
      assert.notEqual(result.status, 0);
    });
  });
});
