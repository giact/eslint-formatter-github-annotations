#!/usr/bin/env node
/**
 * @file Tool that takes the output of `npx prettier --list-different` as input and outputs a multiline string of GitHub checks annotations
 */

import * as process from 'process';
import {githubMessage} from './helper';

/**
 * Given a multiline string of file paths, returns a multiline string of
 * GitHub checks annotations
 */
function prettierFormatter(results: string): string {
  return results
    .trim()
    .split('\n')
    .map((file) => {
      return githubMessage('error', file, 'Code style issues found: please run prettier on this file');
    })
    .join('\n');
}

const stdin = process.stdin;
let data = '';

stdin.setEncoding('utf8');

stdin.on('data', (chunk: string) => {
  data += chunk;
});

stdin.on('end', () => {
  if (data) {
    console.log(prettierFormatter(data));
    process.exit(1); // if we have data, we have issues
  }
});
