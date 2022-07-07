# @giact/eslint-formatter-github-annotations

An [ESLint](https://eslint.org/) formatter to report as GitHub Checks annotations with a bonus command line tool to format [Prettier](https://prettier.io/) output as GitHub Checks annotations.

## Usage

1. Add `@giact/eslint-formatter-github-annotations` to your dependencies:

   ```shell
   npm install --save-dev @giact/eslint-formatter-github-annotations
   ```

2. Create a GitHub action workflow with this formatter:

   ```yaml
   name: Lint
   on:
     pull_request:
   jobs:
     eslint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
             cache: npm
         - run: npm ci
         - name: Prettier
           run: npx prettier --list-different . | npx prettier-formatter-github
         - name: ESLint
           if: always()
           run: npx eslint -f @giact/eslint-formatter-github-annotations .
   ```

## Testing

```shell
npm run test
```

## Contributing

Contributions are welcome. Please check out the [Contributing guide](CONTRIBUTING.md) for the guidelines you need to follow.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) so that you can understand the kind of respectful behavior we expect of all participants.

## License

Open Source Project is released under the MIT license. See [LICENSE](LICENSE) for the full license text.
