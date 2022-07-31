import typescript from '@rollup/plugin-typescript';

export default {
  input: 'lib/index.ts',

  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],

  plugins: [typescript({ tsconfig: 'tsconfig.lib.json' })],
};
