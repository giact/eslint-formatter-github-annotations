/**
 * @file GitHub checks annotations formatter
 */

import path from 'path';
import {ESLint} from 'eslint';
import {githubEscapeData, githubMessage} from './helper';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Formats ESLint results as a list of GitHub checks annotations
 * according to the ESLint Custom Formatter API:
 * https://eslint.org/docs/latest/developer-guide/working-with-custom-formatters
 * @param results ESLint results
 * @returns A multiline string of GitHub checks annotations
 */
function eslintFormatter(results: ReadonlyArray<ESLint.LintResult>): string {
  let output = '';
  let total = 0;

  results.forEach((result) => {
    if (result.messages.length === 0) return;

    const relPath = path.relative(process.cwd(), result.filePath);

    total += result.messages.length;

    output += `::group::EsLint ${githubEscapeData(relPath)}: `;
    output += `errors=${result.errorCount} warnings=${result.warningCount}\n`;
    result.messages.forEach((message) => {
      output +=
        githubMessage(
          message.severity === 1 ? 'warning' : 'error',
          relPath,
          message.message,
          message.line,
          message.column,
          message.ruleId
        ) + '\n';
    });
    output += '::endgroup::\n';
  });

  if (total === 0) {
    output += 'no problems';
  } else {
    output += `\n${total} problem${total !== 1 ? 's' : ''}`;
  }

  return output;
}

export = eslintFormatter; // this is the TypeScript equivalent of module.exports = formatter;
