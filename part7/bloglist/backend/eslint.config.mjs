import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        plugins: {
            "@stylistic": stylisticJs,
        },
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
            ecmaVersion: "latest",
        },
        rules: {
            "@stylistic/indent": ["error", "tab"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/arrow-spacing": ["error", { "before": true, "after": true }],
            "no-unused-vars": "warn",
            "eqeqeq": "error",
        },
    },
    {
        ignores: ["dist/**", "node_modules/**"],
    },
];