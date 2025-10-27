import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
	globalIgnores(["eslint.config.ts"]),
	includeIgnoreFile(gitignorePath),
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	reactHooks.configs.flat.recommended!,
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
		},
	},
);
