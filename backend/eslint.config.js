import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-console": "warn",  // Add this rule to warn against console.logs
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
