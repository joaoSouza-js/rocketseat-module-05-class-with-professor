import swc from 'unplugin-swc';
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        tsconfigPaths: true,

    },
    test: {
        exclude: [
            'node_modules',
            'dist',
            'build',
            'coverage',
            'e2e/**',        // 👈 ignore this folder
            'src/legacy/**', // 👈 example
        ],
    },
    oxc: false,



    plugins: [swc.vite()],
});
