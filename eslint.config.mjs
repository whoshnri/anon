import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...nextVitals,   // ← assuming this is your next/core-web-vitals or similar spread
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',

      // Disable the base rule to prevent conflicts
      'no-unused-vars': 'off',

      // Actually disable the TypeScript one
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
];

export default eslintConfig;