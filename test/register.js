const tsNode = require('ts-node');

tsNode.register({
  files: true,
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});
