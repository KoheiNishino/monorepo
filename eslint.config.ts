import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
	globalIgnores(["eslint.config.ts"]),
	includeIgnoreFile(gitignorePath),
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	react.configs.flat.recommended!,
	react.configs.flat["jsx-runtime"]!,
	reactHooks.configs.flat.recommended!,
	next.configs["core-web-vitals"],
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			"better-tailwindcss": betterTailwindcss,
		},
		rules: {
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			...betterTailwindcss.configs["recommended-error"]!.rules,
			"better-tailwindcss/enforce-consistent-variable-syntax": "error",
			"better-tailwindcss/enforce-consistent-important-position": "error",
			"better-tailwindcss/enforce-consistent-line-wrapping": [
				"error",
				{ indent: "tab" },
			],
			"better-tailwindcss/enforce-shorthand-classes": "error",
			"better-tailwindcss/no-deprecated-classes": "error",
		},
		settings: {
			"better-tailwindcss": {
				entryPoint: "globals.css",
			},
			next: {
				rootDir: ["apps/saas"],
			},
			react: {
				version: "detect",
			},
		},
	},
);
