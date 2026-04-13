
import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    oxc: false,
    test: {

        include: ['**/*.e2e-spec.ts'],
        globals: true,
        alias: {
            '@src': './src',
            '@test': './test',
            'src': resolve(__dirname, './src'),
        },
        setupFiles: './test/setup-e2e.ts',
        exclude: [
            'node_modules',
            'dist',
            'build',
            'coverage',
            'e2e/**',        // 👈 ignore this folder
            'src/legacy/**', // 👈 example
        ],
        root: './',
    },
    plugins: [swc.vite()],
});
