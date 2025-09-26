import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    rules: {
      "max-len": ["error", { code: 100, "ignoreComments": true }], 
      "no-console": "warn",
      "indent": ["error", 2], 
      "quotes": ["error", "double", { avoidEscape: true }], 
      "comma-dangle": ["error", "always-multiline"], 
      "object-curly-spacing": ["error", "always"], 
      "semi": ["error", "always"], 
      "@typescript-eslint/no-explicit-any": "warn", 
      "@typescript-eslint/explicit-module-boundary-types": "off", 
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_", 
        varsIgnorePattern: "^_", 
        caughtErrorsIgnorePattern: "^_", 
      }], 
    },
  }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
