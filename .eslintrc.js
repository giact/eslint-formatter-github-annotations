module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: [
        'total-functions',
      ],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:total-functions/recommended',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {assertionStyle: 'as'},
        ],
        // keep this rule disabled for now, because it can hang for a long time in some cases
        'total-functions/no-unsafe-readonly-mutable-assignment': 'off',
      },
    },
    {
      files: ['test/**/*'],
      env: {mocha: true},
    },
  ],
};
