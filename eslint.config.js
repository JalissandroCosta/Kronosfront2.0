// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin"
import parser from "@typescript-eslint/parser"
import prettier from "eslint-config-prettier"

import reactHooks from "eslint-plugin-react-hooks"

const tsConfigs = tseslint.configs

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks
    },
    rules: {
      ...tsConfigs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "off", // 👈 por enquanto,
      "@typescript-eslint/no-explicit-any":   "off", // 👈 por enquanto
    }
  },
  prettier
]
