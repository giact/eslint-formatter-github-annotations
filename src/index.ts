/**
 * @fileoverview GitHub checks annotations formatter
 */

import path from 'path';
import {ESLint} from 'eslint';

//------------------------------------------------------------------------------
// Helper Functions
//------------------------------------------------------------------------------

/**
 * Returns an escaped string for GitHub checks annotation properties
 * also known as "parameter data" in GitHub documentation
 * https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#about-workflow-commands
 * @param {string} s string to escape
 * @returns {string} escaped string
 * @private
 */
function githubEscapeProperty(s: string): string {
  return s // Properties are the values of parameter pairs, e.g. ::error::key=[property]::data
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A')
    .replace(/:/g, '%3A')
    .replace(/,/g, '%2C');
}

/**
 * Returns an escaped string for GitHub checks annotation data
 * also known as "command value" in GitHub documentation
 * https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#about-workflow-commands
 * @param {string} s string to escape
 * @returns {string} escaped string
 * @private
 */
function githubEscapeData(s: string): string {
  return s // Data is the last (keyless) value, e.g. ::error::key1=property1::key2=property2::[data]
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A');
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

function formatter(results: ESLint.LintResult[]): string {
  let output = '';
  let total = 0;

  results.forEach((result) => {
    if (result.messages.length === 0) return;

    const relPath = path.relative(process.cwd(), result.filePath);

    total += result.messages.length;

    output += `::group::EsLint ${githubEscapeData(relPath)}: `;
    output += `errors=${result.errorCount} warnings=${result.warningCount}\n`;
    result.messages.forEach((message) => {
      output += `::${message.severity === 1 ? 'warning' : 'error'} `;
      output += `file=${githubEscapeProperty(relPath)},line=${message.line || 0}`;
      output += message.column ? `,col=${message.column}` : '';
      output += message.ruleId ? `::[${githubEscapeProperty(message.ruleId)}]` : '';
      output += ` ${githubEscapeData(message.message)}`;
      output += '\n';
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

export = formatter; // this is the TypeScript equivalent of module.exports = formatter;
