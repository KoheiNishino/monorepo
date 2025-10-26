import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
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
		rules: {
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
);
