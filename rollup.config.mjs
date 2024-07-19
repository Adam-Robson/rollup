/**
 * @type {import('rollup').RollupOptions}
 */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: true,
		inlineDynamicImports: true
	},
	context: 'window',
	plugins: [
		resolve({
			browser: true
		}),
		commonjs({
			include: 'node_modules/**',
			transformMixedEsModules: true,
			ignoreGlobal: true,
			sourceMap: true
		}),
		json(),
		terser()
	]
};
