/**
 * @file Helper functions
 */

/**
 * Returns an escaped string for GitHub checks annotation properties
 * also known as "parameter data" in GitHub documentation
 * https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#about-workflow-commands
 * @param {string} s string to escape
 * @returns {string} escaped string
 * @private
 */
export function githubEscapeProperty(s: string): string {
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
export function githubEscapeData(s: string): string {
  return s // Data is the last (keyless) value, e.g. ::error::key1=property1::key2=property2::[data]
    .replace(/%/g, '%25')
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A');
}

/**
 * Returns a GitHub annotation Workflow Command for a given linter error/warning
 * @param severity The type of annotation (error, warning)
 * @param file The source file the message applies to
 * @param message The message itself
 * @param line The line number the message applies to
 * @param column The column number the message applies to
 * @param ruleId The rule ID to prefix the message with ("[ruleId] message")
 * @returns A GitHub annotation Workflow Command
 */
export function githubMessage(
  severity: 'warning' | 'error',
  file: string,
  message: string,
  line = 0,
  column = 0,
  ruleId: string | null = null
): string {
  let output = `::${severity} `;
  output += `file=${githubEscapeProperty(file)}`;
  if (line) output += `,line=${line}`;
  if (column) output += `,col=${column}`;
  output += '::' + (ruleId ? `[${githubEscapeData(ruleId)}] ` : '') + `${githubEscapeData(message)}`;
  return output;
}
