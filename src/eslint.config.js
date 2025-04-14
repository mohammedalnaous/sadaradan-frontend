import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ✅ Assign to a variable instead of exporting directly
const eslintConfig = [
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",  // warns but doesn't break
      "@typescript-eslint/no-unused-vars": "warn",   // warns but doesn't break
    },
  },
];

export default eslintConfig;
