import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist", "node_modules", "coverage", "generated"],
  },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript recommended (with type-checking)
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      /* ========================
         TYPESCRIPT STRICTNESS
      ======================== */
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      /* ========================
         CODE QUALITY
      ======================== */
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",

      /* ========================
         IMPORT ORGANIZATION
      ======================== */
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],

      /* ========================
         NESTJS FRIENDLY
      ======================== */
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      /* ========================
         LIGHT FORMATTING (NO PRETTIER)
      ======================== */
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
]);
