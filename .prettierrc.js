const prettierConfig = {
  plugins: [
    './node_modules/prettier-plugin-multiline-arrays',
  ],
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: false,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  vueIndentScriptAndStyle: false,
};

module.exports = prettierConfig;
