import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "build/",
      "dist/",
      "*.log",
      "*.tmp",
      "*.tsbuildinfo",
      "coverage/",
      ".vscode/",
      ".idea/",
      "*.config.mjs",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true }
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react": reactPlugin
    },
    rules: {
      // Keep default rules; we are not using react-hooks/exhaustive-deps inline anymore
    },
  },
  {
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        JSX: "readonly"
      },
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
];
