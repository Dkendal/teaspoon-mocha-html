import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: '_build/main.rollup.js',
    format: 'cjs',
  },
  sourcemap: true,
  plugins: [
    cjs(),
    resolve(),
    babel({exclude: 'node_modules/**'})
  ],
};
